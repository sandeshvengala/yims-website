# 🗄️ YIMS Database - Complete Reference

## 📍 Database File Location

```
c:\Users\ADMIN\Downloads\YIMS Website\New folder\yims-web\server\data\yims.db
```

**Type**: SQLite3 Database  
**Size**: ~49 KB  
**Created**: February 5, 2026  
**Status**: Active and Running

---

## 📂 Directory Structure

```
yims-web/
├── server/
│   ├── index.js (API server - reads/writes to database)
│   └── data/
│       ├── yims.db ⭐ (Main SQLite database)
│       └── excel/
│           └── (All exported Excel files go here)
└── ...
```

---

## 📋 All Database Tables

### 1. **students**
**Purpose**: Student enrollment records  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `studentId` (TEXT, UNIQUE) - e.g., STU-101
- `name` (TEXT) - Student full name
- `phone` (TEXT) - Contact number
- `course` (TEXT) - Enrolled course
- `admissionDate` (TEXT) - When enrolled
- `status` (TEXT) - Active/Inactive/Graduated

**Sample Data**: None (add via Admin > Manage Students)

---

### 2. **attendance**
**Purpose**: Daily class attendance tracking  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `studentId` (TEXT) - Links to students table
- `date` (TEXT) - Class date (YYYY-MM-DD)
- `status` (TEXT) - "present" or "absent"
- `notes` (TEXT) - Optional notes

**Sample Data**: None (auto-tracked by staff)

---

### 3. **results**
**Purpose**: Test scores and exam grades  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `studentId` (TEXT) - Links to students table
- `exam` (TEXT) - Test/exam name
- `score` (TEXT) - Score obtained
- `resultDate` (TEXT) - Date of test

**Sample Data**: None (entered by staff)

---

### 4. **alumni**
**Purpose**: Past students and placement records  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `studentId` (TEXT) - Former student ID
- `name` (TEXT) - Graduate name
- `year` (TEXT) - Year of passing
- `placement` (TEXT) - Placement status/company

**Sample Data**: None

---

### 5. **admissions**
**Purpose**: Student admission applications  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `studentName` (TEXT) - Applicant name
- `guardianName` (TEXT) - Parent/guardian name
- `phone` (TEXT) - Contact number
- `course` (TEXT) - Applied course
- `address` (TEXT) - Residential address
- `applicationDate` (TEXT) - Submission date
- `status` (TEXT) - "Pending", "Approved", "Rejected"

**Auto-Populated When**: User submits form at `/apply-admission`  
**Auto-Export**: Saves to Excel automatically

---

### 6. **users**
**Purpose**: User accounts with role-based access  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `role` (TEXT) - "admin", "staff", or "student"
- `identifier` (TEXT) - Login ID
- `email` (TEXT) - Email address
- `passwordHash` (TEXT) - Bcryptjs hashed password
- **UNIQUE**: (role, identifier) - One ID per role

**Pre-Seeded Data** (3 default accounts):
```
┌─────────────────────────────────────────────────┐
│ Role    │ ID         │ Password      │ Email     │
├─────────────────────────────────────────────────┤
│ admin   │ admin001   │ Admin@123     │ admin@yims│
│ staff   │ staff001   │ Staff@123     │ staff@yims│
│ student │ STU-101    │ Student@123   │ stu@yims  │
└─────────────────────────────────────────────────┘
```

---

### 7. **password_resets**
**Purpose**: Password recovery mechanism  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER) - Links to users table
- `token` (TEXT) - Reset token (crypto random)
- `expiresAt` (TEXT) - Token expiry timestamp
- `used` (INTEGER) - 0=unused, 1=already used

**Created When**: User clicks "Forgot Password?" and requests reset

---

### 8. **contact_messages** ⭐ NEW
**Purpose**: Contact form submissions from public  
**Columns**:
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT) - Sender name
- `email` (TEXT) - Sender email
- `subject` (TEXT) - Message subject
- `message` (TEXT) - Message content
- `submittedAt` (TEXT) - Submission timestamp
- `status` (TEXT) - "New", "Reviewed", "Replied"

**Auto-Populated When**: User submits form at `/contact`

---

## 🔄 API Endpoints Using Database

### Students
```
GET    /api/students              # Get all students
GET    /api/students/:id          # Get one student
POST   /api/students              # Add new student
PUT    /api/students/:id          # Update student
DELETE /api/students/:id          # Delete student
POST   /api/students/import       # Import from Excel
GET    /api/students/export       # Export to Excel
```

### Attendance
```
GET    /api/attendance            # Get all records
GET    /api/attendance/:id        # Get one record
POST   /api/attendance            # Add record
PUT    /api/attendance/:id        # Update record
DELETE /api/attendance/:id        # Delete record
POST   /api/attendance/import     # Import from Excel
GET    /api/attendance/export     # Export to Excel
```

### Results
```
GET    /api/results               # Get all results
POST   /api/results               # Add result
PUT    /api/results/:id           # Update result
DELETE /api/results/:id           # Delete result
POST   /api/results/import        # Import from Excel
GET    /api/results/export        # Export to Excel
```

### Alumni
```
GET    /api/alumni                # Get all alumni
POST   /api/alumni                # Add alumni record
PUT    /api/alumni/:id            # Update record
DELETE /api/alumni/:id            # Delete record
POST   /api/alumni/import         # Import from Excel
GET    /api/alumni/export         # Export to Excel
```

### Admissions
```
GET    /api/admissions            # Get all applications
POST   /api/admissions            # Submit application
PUT    /api/admissions/:id        # Update status
DELETE /api/admissions/:id        # Delete application
POST   /api/admissions/import     # Import from Excel
GET    /api/admissions/export     # Auto-exports on POST
```

### Users
```
GET    /api/users                 # Get all users
POST   /api/users                 # Create new user
PUT    /api/users/:id             # Update user
DELETE /api/users/:id             # Delete user
POST   /api/users/import          # Import from Excel
GET    /api/users/export          # Export to Excel
GET    /api/users-list            # Get users dropdown list
```

### Contact
```
POST   /api/contact               # Submit contact form
GET    /api/contact-messages      # Get all messages (admin)
```

### Statistics
```
GET    /api/stats/admin           # Admin dashboard stats
GET    /api/stats/staff           # Staff dashboard stats
GET    /api/stats/student/:id     # Student dashboard stats
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Actions                             │
└─────────────────────────────────────────────────────────────┘
          │              │              │
          ↓              ↓              ↓
    Frontend UI     Admin Pages    Staff Pages
          │              │              │
          └──────────────┴──────────────┘
                        ↓
          ┌─────────────────────────┐
          │    Express API Server   │
          │   (server/index.js)     │
          └─────────────────────────┘
                        ↓
          ┌─────────────────────────┐
          │   SQLite Database       │
          │   (yims.db)             │
          │                         │
          │  ✓ students             │
          │  ✓ attendance           │
          │  ✓ results              │
          │  ✓ alumni               │
          │  ✓ admissions           │
          │  ✓ users                │
          │  ✓ password_resets      │
          │  ✓ contact_messages     │
          └─────────────────────────┘
                        │
          ┌─────────────┴──────────────┐
          ↓                            ↓
    Excel Export              Local Files
   (server/data/excel/)        (server/data/)
```

---

## 🎯 Common Data Operations

### Add Student
```
1. Login as admin (admin001)
2. Go to Admin > Manage Students
3. Fill form → POST /api/students
4. Database stores in 'students' table
5. Display updated list
```

### Track Attendance
```
1. Login as staff (staff001)
2. Go to Track Attendance
3. Mark present/absent → POST /api/attendance
4. Database stores with date & studentId
5. Calculated in Student Profile
```

### Submit Application
```
1. Go to /apply-admission
2. Fill form → POST /api/admissions
3. Data stored in 'admissions' table
4. Auto-exports to Excel
5. File saved in server/data/excel/
```

### Submit Contact Form
```
1. Go to /contact
2. Fill form → POST /api/contact
3. Data stored in 'contact_messages' table
4. Shows success message
5. Admin can view all messages
```

---

## 🔒 Data Security

### Password Hashing
- All passwords hashed with **bcryptjs** (10 salt rounds)
- Never stored in plain text
- Verified on login with `bcrypt.compare()`

### Access Control
- **Role-based** (admin, staff, student)
- **Protected routes** on frontend
- **API validation** on backend

### Data Backup
- Export to Excel anytime via UI
- Files saved in `server/data/excel/`
- SQLite file backed up in `server/data/yims.db`

---

## 📈 Database Statistics

```
Total Tables:     8
Total Columns:    ~40
Max File Size:    Unlimited (SQLite)
Supported Users:  Unlimited
Data Retention:   Indefinite (until manual delete)
Backup Location:  server/data/excel/
```

---

## 🛠️ Managing the Database

### View Database
**Option 1**: Use SQLite Browser (free)
- Download: https://sqlitebrowser.org/
- Open: `server/data/yims.db`
- View all tables and data

**Option 2**: Use Admin Panel
- Login at http://localhost:5173/login
- Use credentials: admin001 / Admin@123
- Manage all data through UI

### Backup Database
```powershell
# Copy entire data folder
Copy-Item -Path "server/data" -Destination "server/data_backup_$(Get-Date -Format 'yyyy-MM-dd')" -Recurse
```

### Export All Data
1. Login as admin
2. Go to Admin Dashboard
3. Click each "Export" button:
   - Students → students.xlsx
   - Attendance → attendance.xlsx
   - Results → results.xlsx
   - Alumni → alumni.xlsx
   - Admissions → admissions.xlsx
   - Users → users.xlsx
4. All files save to `server/data/excel/`

---

## ⚠️ Important Notes

1. **Database Type**: SQLite3 (file-based, no server needed)
2. **Location**: `server/data/yims.db` (relative to root)
3. **Auto-Created**: On first server start
4. **Default Data**: 3 users pre-seeded
5. **No Password**: Direct file access (use UI for safety)
6. **Port Used**: 4000 (API server)
7. **Excel Exports**: Automatic after form submissions

---

## 📞 Quick Reference

| Need | Location |
|------|----------|
| Main Database | `server/data/yims.db` |
| Excel Exports | `server/data/excel/` |
| Server Code | `server/index.js` |
| API Docs | See PAGES_GUIDE.md |
| Test Accounts | See users table |
| Backups | Manual copy folder |

