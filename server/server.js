import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import XLSX from "xlsx";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import models
import Student from "./models/Student.js";
import Attendance from "./models/Attendance.js";
import Result from "./models/Result.js";
import Alumni from "./models/Alumni.js";
import Admission from "./models/Admission.js";
import User from "./models/User.js";
import PasswordReset from "./models/PasswordReset.js";
import Contact from "./models/Contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Excel storage directory
const excelDir = path.join(__dirname, "data/excel");
fs.mkdirSync(excelDir, { recursive: true });

// Multer for file uploads
const upload = multer({ dest: "uploads/" });

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yims');
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Seed default users
const seedDefaultUsers = async () => {
  try {
    const users = [
      { username: "admin001", password: "Admin@123", role: "admin" },
      { username: "staff001", password: "Staff@123", role: "staff" },
      { username: "STU-101", password: "Student@123", role: "student", studentId: "STU-101" },
    ];

    for (const userData of users) {
      const existing = await User.findOne({ username: userData.username });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({ ...userData, password: hashedPassword });
        console.log(`✓ User ${userData.role}/${userData.username} created`);
      } else {
        console.log(`✓ User ${userData.role}/${userData.username} already exists`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

// Excel Export Helper
const exportToExcel = async (collectionName, data, fileName) => {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, collectionName);
    const filePath = path.join(excelDir, fileName);
    XLSX.writeFile(wb, filePath);
    return filePath;
  } catch (error) {
    console.error("Excel export error:", error);
    throw error;
  }
};

// ==================== AUTH ENDPOINTS ====================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      role: user.role,
      username: user.username,
      studentId: user.studentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await PasswordReset.create({ username, token, expiresAt });

    res.json({ message: "Reset token generated", token });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const reset = await PasswordReset.findOne({ token, expiresAt: { $gt: new Date() } });

    if (!reset) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ username: reset.username }, { password: hashedPassword });
    await PasswordReset.deleteOne({ token });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== STUDENT ENDPOINTS ====================
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    
    // Auto-export to Excel
    const allStudents = await Student.find();
    await exportToExcel("Students", allStudents.map(s => s.toObject()), "students.xlsx");
    
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Auto-export to Excel
    const allStudents = await Student.find();
    await exportToExcel("Students", allStudents.map(s => s.toObject()), "students.xlsx");
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    
    // Auto-export to Excel
    const allStudents = await Student.find();
    await exportToExcel("Students", allStudents.map(s => s.toObject()), "students.xlsx");
    
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

// ==================== ATTENDANCE ENDPOINTS ====================
app.get("/api/attendance", async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = studentId ? { studentId } : {};
    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    
    // Auto-export to Excel
    const allAttendance = await Attendance.find();
    await exportToExcel("Attendance", allAttendance.map(a => a.toObject()), "attendance.xlsx");
    
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.delete("/api/attendance/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    
    // Auto-export to Excel
    const allAttendance = await Attendance.find();
    await exportToExcel("Attendance", allAttendance.map(a => a.toObject()), "attendance.xlsx");
    
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== RESULTS ENDPOINTS ====================
app.get("/api/results", async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = studentId ? { studentId } : {};
    const results = await Result.find(query).sort({ resultDate: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/results", async (req, res) => {
  try {
    const result = await Result.create(req.body);
    
    // Auto-export to Excel
    const allResults = await Result.find();
    await exportToExcel("Results", allResults.map(r => r.toObject()), "results.xlsx");
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.delete("/api/results/:id", async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    
    // Auto-export to Excel
    const allResults = await Result.find();
    await exportToExcel("Results", allResults.map(r => r.toObject()), "results.xlsx");
    
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== ALUMNI ENDPOINTS ====================
app.get("/api/alumni", async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ graduationYear: -1 });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/alumni", async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    
    // Auto-export to Excel
    const allAlumni = await Alumni.find();
    await exportToExcel("Alumni", allAlumni.map(a => a.toObject()), "alumni.xlsx");
    
    res.status(201).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.delete("/api/alumni/:id", async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    
    // Auto-export to Excel
    const allAlumni = await Alumni.find();
    await exportToExcel("Alumni", allAlumni.map(a => a.toObject()), "alumni.xlsx");
    
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== ADMISSIONS ENDPOINTS ====================
app.get("/api/admissions", async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/api/admissions", async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    
    // Auto-export to Excel
    const allAdmissions = await Admission.find();
    await exportToExcel("Admissions", allAdmissions.map(a => a.toObject()), "admissions.xlsx");
    
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.put("/api/admissions/:id", async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Auto-export to Excel
    const allAdmissions = await Admission.find();
    await exportToExcel("Admissions", allAdmissions.map(a => a.toObject()), "admissions.xlsx");
    
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.delete("/api/admissions/:id", async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    
    // Auto-export to Excel
    const allAdmissions = await Admission.find();
    await exportToExcel("Admissions", allAdmissions.map(a => a.toObject()), "admissions.xlsx");
    
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== CONTACT ENDPOINTS ====================
app.post("/api/contact", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Auto-export to Excel
    const allContacts = await Contact.find();
    await exportToExcel("Contacts", allContacts.map(c => c.toObject()), "contacts.xlsx");
    
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== EXCEL EXPORT ENDPOINTS ====================
app.get("/api/excel/export/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    let data = [];
    let fileName = "";

    switch (collection) {
      case "students":
        data = await Student.find();
        fileName = "students.xlsx";
        break;
      case "attendance":
        data = await Attendance.find();
        fileName = "attendance.xlsx";
        break;
      case "results":
        data = await Result.find();
        fileName = "results.xlsx";
        break;
      case "alumni":
        data = await Alumni.find();
        fileName = "alumni.xlsx";
        break;
      case "admissions":
        data = await Admission.find();
        fileName = "admissions.xlsx";
        break;
      case "contacts":
        data = await Contact.find();
        fileName = "contacts.xlsx";
        break;
      default:
        return res.status(400).json({ message: "Invalid collection" });
    }

    const filePath = await exportToExcel(collection, data.map(d => d.toObject()), fileName);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Export error", error: error.message });
  }
});

// ==================== STATS ENDPOINTS ====================
app.get("/api/stats/admin", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const pendingAdmissions = await Admission.countDocuments({ status: "Pending" });
    const totalAlumni = await Alumni.countDocuments();
    const totalContacts = await Contact.countDocuments();

    res.json({
      totalStudents,
      pendingAdmissions,
      totalAlumni,
      totalContacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ==================== EXCEL IMPORT ENDPOINT ====================
app.post("/api/excel/import/:collection", upload.single("file"), async (req, res) => {
  try {
    const { collection } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let Model;
    switch (collection) {
      case "students":
        Model = Student;
        break;
      case "attendance":
        Model = Attendance;
        break;
      case "results":
        Model = Result;
        break;
      case "alumni":
        Model = Alumni;
        break;
      case "admissions":
        Model = Admission;
        break;
      default:
        return res.status(400).json({ message: "Invalid collection" });
    }

    await Model.insertMany(data);
    fs.unlinkSync(file.path); // Clean up

    res.json({ message: `${data.length} records imported successfully` });
  } catch (error) {
    res.status(500).json({ message: "Import error", error: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mongodb: mongoose.connection.readyState === 1 });
});

// Start server
const startServer = async () => {
  await connectDB();
  await seedDefaultUsers();
  
  app.listen(PORT, () => {
    console.log(`\n🚀 YIMS Cloud Server running on port ${PORT}`);
    console.log(`📊 Database: MongoDB`);
    console.log(`📁 Excel exports: ${excelDir}`);
  });
};

startServer();
