import express from "express";
import cors from "cors";
import multer from "multer";
import XLSX from "xlsx";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDir = path.join(__dirname, "data");
const dbPath = path.join(dbDir, "yims.db");

fs.mkdirSync(dbDir, { recursive: true });

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT UNIQUE,
    name TEXT,
    phone TEXT,
    course TEXT,
    admissionDate TEXT,
    status TEXT
  );
  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT,
    date TEXT,
    status TEXT,
    notes TEXT
  );
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT,
    exam TEXT,
    score TEXT,
    resultDate TEXT
  );
  CREATE TABLE IF NOT EXISTS alumni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT,
    name TEXT,
    year TEXT,
    placement TEXT
  );
  CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    guardianName TEXT,
    phone TEXT,
    course TEXT,
    address TEXT,
    applicationDate TEXT,
    status TEXT DEFAULT 'Pending'
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    identifier TEXT NOT NULL,
    email TEXT,
    passwordHash TEXT NOT NULL,
    UNIQUE(role, identifier)
  );
  CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    token TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submittedAt TEXT NOT NULL,
    status TEXT DEFAULT 'New'
  );
`);

const seedUser = async ({ role, identifier, email, password }) => {
  const existing = await db.get(
    "SELECT id FROM users WHERE role = ? AND identifier = ?",
    role,
    identifier
  );
  if (existing) {
    console.log(`✓ User ${role}/${identifier} already exists`);
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.run(
    "INSERT INTO users (role, identifier, email, passwordHash) VALUES (?, ?, ?, ?)",
    role,
    identifier,
    email,
    passwordHash
  );
  console.log(`✓ Created user: ${role}/${identifier}`);
};

console.log("Seeding default users...");
await seedUser({
  role: "admin",
  identifier: "admin001",
  email: "admin@yims.local",
  password: "Admin@123",
});
await seedUser({
  role: "staff",
  identifier: "staff001",
  email: "staff@yims.local",
  password: "Staff@123",
});
await seedUser({
  role: "student",
  identifier: "STU-101",
  email: "student@yims.local",
  password: "Student@123",
});
console.log("User seeding complete.");

const app = express();
const upload = multer({ dest: path.join(__dirname, "uploads") });

app.use(cors());
app.use(express.json());

const mailTransport = (() => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
})();

const sendResetEmail = async (email, token) => {
  if (!mailTransport) {
    console.log("Password reset token:", token, "for", email);
    return;
  }
  const from = process.env.SMTP_FROM || "no-reply@yims.local";
  await mailTransport.sendMail({
    from,
    to: email,
    subject: "YIMS Password Reset",
    text: `Your reset code is: ${token}. It expires in 15 minutes.`,
  });
};

const entities = {
  students: {
    table: "students",
    columns: ["studentId", "name", "phone", "course", "admissionDate", "status"],
    upsertKey: "studentId",
  },
  attendance: {
    table: "attendance",
    columns: ["studentId", "date", "status", "notes"],
    upsertKey: "studentId",
  },
  results: {
    table: "results",
    columns: ["studentId", "exam", "score", "resultDate"],
    upsertKey: "studentId",
  },
  alumni: {
    table: "alumni",
    columns: ["studentId", "name", "year", "placement"],
    upsertKey: "studentId",
  },
  admissions: {
    table: "admissions",
    columns: ["studentName", "guardianName", "phone", "course", "address", "applicationDate", "status"],
    upsertKey: "phone",
  },
};

const getEntity = (name) => entities[name];

const pickColumns = (columns, payload) => {
  const record = {};
  columns.forEach((column) => {
    if (payload[column] !== undefined) {
      record[column] = payload[column];
    }
  });
  return record;
};

app.post("/api/auth/login", async (req, res) => {
  const { role, identifier, password } = req.body ?? {};
  console.log(`Login attempt: role=${role}, identifier=${identifier}`);
  
  if (!role || !identifier || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  
  const user = await db.get(
    "SELECT id, role, identifier, email, passwordHash FROM users WHERE role = ? AND identifier = ?",
    role,
    identifier
  );
  
  if (!user) {
    console.log(`User not found: ${role}/${identifier}`);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  
  if (!valid) {
    console.log(`Invalid password for: ${role}/${identifier}`);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log(`✓ Login successful: ${role}/${identifier}`);
  res.json({
    id: user.id,
    role: user.role,
    identifier: user.identifier,
    email: user.email,
  });
});

app.post("/api/auth/request-reset", async (req, res) => {
  const { role, email } = req.body ?? {};
  if (!role || !email) {
    return res.status(400).json({ message: "Role and email required" });
  }
  const user = await db.get(
    "SELECT id, email FROM users WHERE role = ? AND email = ?",
    role,
    email
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await db.run(
    "INSERT INTO password_resets (userId, token, expiresAt) VALUES (?, ?, ?)",
    user.id,
    token,
    expiresAt
  );
  await sendResetEmail(user.email, token);
  res.json({ message: "Reset code sent" });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { token, newPassword } = req.body ?? {};
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password required" });
  }
  const reset = await db.get(
    "SELECT id, userId, expiresAt, used FROM password_resets WHERE token = ? ORDER BY id DESC",
    token
  );
  if (!reset || reset.used) {
    return res.status(400).json({ message: "Invalid reset code" });
  }
  if (new Date(reset.expiresAt) < new Date()) {
    return res.status(400).json({ message: "Reset code expired" });
  }
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await db.run("UPDATE users SET passwordHash = ? WHERE id = ?", passwordHash, reset.userId);
  await db.run("UPDATE password_resets SET used = 1 WHERE id = ?", reset.id);
  res.json({ message: "Password updated" });
});

app.post("/api/users", async (req, res) => {
  const { role, identifier, email, password } = req.body ?? {};
  if (!role || !identifier || !password) {
    return res.status(400).json({ message: "Role, identifier, and password required" });
  }
  if ((role === "admin" || role === "staff") && !email) {
    return res.status(400).json({ message: "Email required for admin and staff" });
  }
  const existing = await db.get(
    "SELECT id FROM users WHERE role = ? AND identifier = ?",
    role,
    identifier
  );
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.run(
    "INSERT INTO users (role, identifier, email, passwordHash) VALUES (?, ?, ?, ?)",
    role,
    identifier,
    email || null,
    passwordHash
  );
  res.status(201).json({ message: "User created" });
});

app.get("/api/users-list", async (req, res) => {
  const users = await db.all(
    "SELECT id, role, identifier, email FROM users ORDER BY role, identifier"
  );
  res.json(users);
});

app.get("/api/users/export", async (req, res) => {
  const users = await db.all(
    "SELECT id, role, identifier, email FROM users ORDER BY role, identifier"
  );
  const worksheet = XLSX.utils.json_to_sheet(users);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "users");

  const excelDir = path.join(__dirname, "data", "excel");
  fs.mkdirSync(excelDir, { recursive: true });
  const filePath = path.join(excelDir, "users.xlsx");
  XLSX.writeFile(workbook, filePath);

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=users.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(buffer);
});

app.post("/api/users/import", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File missing" });

  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  for (const row of data) {
    const { role, identifier, email, password } = row;
    if (!role || !identifier) continue;

    const existing = await db.get(
      "SELECT id FROM users WHERE role = ? AND identifier = ?",
      role,
      identifier
    );

    if (existing) {
      if (password) {
        const passwordHash = await bcrypt.hash(password, 10);
        await db.run(
          "UPDATE users SET email = ?, passwordHash = ? WHERE id = ?",
          email || null,
          passwordHash,
          existing.id
        );
      } else {
        await db.run(
          "UPDATE users SET email = ? WHERE id = ?",
          email || null,
          existing.id
        );
      }
      continue;
    }

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      await db.run(
        "INSERT INTO users (role, identifier, email, passwordHash) VALUES (?, ?, ?, ?)",
        role,
        identifier,
        email || null,
        passwordHash
      );
    }
  }

  fs.unlink(req.file.path, () => {});
  res.json({ message: "Import complete" });
});

// Contact Messages Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.run(
      "INSERT INTO contact_messages (name, email, subject, message, submittedAt) VALUES (?, ?, ?, ?, ?)",
      name,
      email,
      subject,
      message,
      new Date().toISOString()
    );
    res.json({ message: "Your message has been received successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Get all contact messages (admin only)
app.get("/api/contact-messages", async (req, res) => {
  try {
    const messages = await db.all("SELECT * FROM contact_messages ORDER BY submittedAt DESC");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

app.get("/api/stats/admin", async (req, res) => {
  const totalStudents = await db.get("SELECT COUNT(*) as count FROM students");
  const activeStaff = await db.get("SELECT COUNT(*) as count FROM users WHERE role = 'staff'");
  const todayAttendance = await db.get(
    "SELECT COUNT(*) as count FROM attendance WHERE date = date('now')"
  );
  const totalAlumni = await db.get("SELECT COUNT(*) as count FROM alumni");
  const pendingAdmissions = await db.get("SELECT COUNT(*) as count FROM admissions WHERE status = 'Pending'");
  
  res.json({
    totalStudents: totalStudents?.count ?? 0,
    activeStaff: activeStaff?.count ?? 0,
    todayAttendance: todayAttendance?.count ?? 0,
    totalAlumni: totalAlumni?.count ?? 0,
    pendingAdmissions: pendingAdmissions?.count ?? 0,
  });
});

app.get("/api/stats/staff", async (req, res) => {
  const classesToday = await db.get(
    "SELECT COUNT(DISTINCT studentId) as count FROM attendance WHERE date = date('now')"
  );
  const pendingQueries = 0; // Placeholder for future implementation
  const avgAttendance = await db.get(`
    SELECT ROUND(AVG(present) * 100, 1) as avg FROM (
      SELECT COUNT(*) as present FROM attendance WHERE status = 'Present'
      GROUP BY date
    )
  `);
  
  res.json({
    classesToday: classesToday?.count ?? 0,
    pendingQueries: pendingQueries ?? 0,
    avgAttendance: avgAttendance?.avg ?? 0,
  });
});

app.get("/api/stats/student/:studentId", async (req, res) => {
  const { studentId } = req.params;
  
  const totalAttendance = await db.get(
    "SELECT COUNT(*) as count FROM attendance WHERE studentId = ?",
    studentId
  );
  const presentCount = await db.get(
    "SELECT COUNT(*) as count FROM attendance WHERE studentId = ? AND status = 'Present'",
    studentId
  );
  
  const attendancePercent = totalAttendance?.count > 0
    ? Math.round((presentCount?.count / totalAttendance.count) * 100)
    : 0;
  
  const assignmentsCount = 0; // Placeholder for future implementation
  const feesStatus = "Paid"; // Placeholder for future implementation
  
  res.json({
    attendancePercent: attendancePercent ?? 0,
    assignmentsCount: assignmentsCount ?? 0,
    feesStatus: feesStatus ?? "Unknown",
  });
});

app.get("/api/excel-files", async (req, res) => {
  try {
    const excelDir = path.join(__dirname, "data", "excel");
    if (!fs.existsSync(excelDir)) {
      return res.json([]);
    }
    
    const files = fs.readdirSync(excelDir);
    const excelFiles = files
      .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'))
      .map(file => {
        const filePath = path.join(excelDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          date: stats.mtime.toISOString(),
          downloadUrl: `/api/download-excel/${file}`
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(excelFiles);
  } catch (error) {
    console.error("Error reading excel files:", error);
    res.status(500).json({ message: "Failed to read excel files" });
  }
});

app.get("/api/download-excel/:filename", (req, res) => {
  const filename = req.params.filename;
  const excelDir = path.join(__dirname, "data", "excel");
  const filePath = path.join(excelDir, filename);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(excelDir)) {
    return res.status(403).json({ message: "Access denied" });
  }
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }
  
  res.download(filePath, filename);
});

app.get("/api/:entity", async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });
  const rows = await db.all(`SELECT * FROM ${entity.table} ORDER BY id DESC`);
  res.json(rows);
});

app.post("/api/:entity", async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });

  const record = pickColumns(entity.columns, req.body ?? {});
  const columns = Object.keys(record);
  if (columns.length === 0) {
    return res.status(400).json({ message: "No valid columns provided" });
  }

  const placeholders = columns.map(() => "?").join(", ");
  const values = columns.map((column) => record[column]);

  const result = await db.run(
    `INSERT INTO ${entity.table} (${columns.join(", ")}) VALUES (${placeholders})`,
    values
  );

  res.status(201).json({ id: result.lastID });
});

app.put("/api/:entity/:id", async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });

  const record = pickColumns(entity.columns, req.body ?? {});
  const columns = Object.keys(record);
  if (columns.length === 0) {
    return res.status(400).json({ message: "No valid columns provided" });
  }

  const values = columns.map((column) => record[column]);
  values.push(req.params.id);

  await db.run(
    `UPDATE ${entity.table} SET ${columns
      .map((column) => `${column} = ?`)
      .join(", ")} WHERE id = ?`,
    values
  );

  res.json({ message: "Updated" });
});

app.delete("/api/:entity/:id", async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });

  await db.run(`DELETE FROM ${entity.table} WHERE id = ?`, req.params.id);
  res.json({ message: "Deleted" });
});

app.post("/api/:entity/import", upload.single("file"), async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });
  if (!req.file) return res.status(400).json({ message: "File missing" });

  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  for (const row of data) {
    const record = pickColumns(entity.columns, row);
    const upsertValue = row[entity.upsertKey] ?? record[entity.upsertKey];
    const idValue = row.id ?? row.ID ?? row.Id;

    if (idValue) {
      const columns = Object.keys(record);
      if (columns.length === 0) continue;
      const values = columns.map((column) => record[column]);
      values.push(idValue);
      await db.run(
        `UPDATE ${entity.table} SET ${columns
          .map((column) => `${column} = ?`)
          .join(", ")} WHERE id = ?`,
        values
      );
      continue;
    }

    if (upsertValue) {
      const existing = await db.get(
        `SELECT id FROM ${entity.table} WHERE ${entity.upsertKey} = ?`,
        upsertValue
      );
      if (existing) {
        const columns = Object.keys(record);
        if (columns.length === 0) continue;
        const values = columns.map((column) => record[column]);
        values.push(existing.id);
        await db.run(
          `UPDATE ${entity.table} SET ${columns
            .map((column) => `${column} = ?`)
            .join(", ")} WHERE id = ?`,
          values
        );
        continue;
      }
    }

    const columns = Object.keys(record);
    if (columns.length === 0) continue;
    const placeholders = columns.map(() => "?").join(", ");
    const values = columns.map((column) => record[column]);
    await db.run(
      `INSERT INTO ${entity.table} (${columns.join(", ")}) VALUES (${placeholders})`,
      values
    );
  }

  fs.unlink(req.file.path, () => {});
  res.json({ message: "Import complete" });
});

app.get("/api/:entity/export", async (req, res) => {
  const entity = getEntity(req.params.entity);
  if (!entity) return res.status(404).json({ message: "Entity not found" });

  const rows = await db.all(`SELECT * FROM ${entity.table} ORDER BY id ASC`);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, entity.table);

  const excelDir = path.join(__dirname, "data", "excel");
  fs.mkdirSync(excelDir, { recursive: true });
  const filePath = path.join(excelDir, `${entity.table}.xlsx`);
  XLSX.writeFile(workbook, filePath);

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${entity.table}.xlsx`
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(buffer);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`YIMS data server running on http://localhost:${port}`);
});
