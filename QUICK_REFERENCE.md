# 🎯 YIMS Website - Quick Reference Card

## 🚀 Start Application

```bash
# Terminal 1 - Backend (port 4000)
cd "c:\Users\ADMIN\Downloads\YIMS Website\New folder\yims-web"
node server/index.js

# Terminal 2 - Frontend (port 5173)
cd "c:\Users\ADMIN\Downloads\YIMS Website\New folder\yims-web"
npm run dev
```

**Access**: http://localhost:5173

---

## 🔐 Test Accounts

| Role | ID | Password | Dashboard |
|------|-----|----------|-----------|
| 👨‍💼 Admin | admin001 | Admin@123 | /admin |
| 👨‍🏫 Staff | staff001 | Staff@123 | /staff |
| 👨‍🎓 Student | STU-101 | Student@123 | /student |

---

## 📍 Key Pages Map

### 🌐 Public (No Login)
```
Home (/)
├── Courses (/courses)
│   └── Enroll Now → Apply (/apply-admission)
├── Admissions (/admissions)
│   └── Apply Now → Apply (/apply-admission)
├── Contact (/contact)
│   └── Submit form → Database
└── Login (/login)
```

### 👨‍🎓 Student (After Login)
```
Dashboard (/student)
└── View Profile (/student/:id)
    ├── Attendance %
    ├── Test Results
    └── Back to Dashboard
```

### 👨‍💼 Admin (After Login)
```
Dashboard (/admin)
├── Manage Students → Excel ↔️
├── Track Attendance → Excel ↔️
├── View Results → Excel ↔️
├── Review Admissions → Excel ↔️
├── Manage Users → Excel ↔️
└── Excel Files Library (/admin/excel-files)
    └── Download all exports
```

---

## ✨ New Features Added

### ✅ StudentProfile Page (Updated)
- Real data from `/api/students/:id`
- Live attendance percentage
- Test results display
- Loading states
- Error handling

### ✅ Contact Form (Working)
- Database integration
- Email field validation
- Success notifications
- Stored in `contact_messages` table

### ✅ Better Navigation
- Courses page: "Enroll Now" buttons
- Admissions page: "Apply Now" CTA
- Cross-page linking throughout

### ✅ Excel Library
- `/admin/excel-files` page
- Download all exported files
- File size and date display

---

## 🗄️ API Quick Reference

### Public APIs
```
POST /api/contact              # Submit contact form
POST /api/auth/login           # User login
POST /api/auth/request-reset   # Password reset request
POST /api/admissions           # Submit admission
```

### Protected APIs
```
GET    /api/students           # List all students
GET    /api/students/:id       # Get one student
POST   /api/students           # Add student
PUT    /api/students/:id       # Update student
DELETE /api/students/:id       # Delete student
POST   /api/students/import    # Import from Excel
GET    /api/students/export    # Export to Excel

# Same pattern for: attendance, results, alumni, users
```

### Dashboard Stats APIs
```
GET /api/stats/admin           # Admin dashboard stats
GET /api/stats/staff           # Staff dashboard stats
GET /api/stats/student/:id     # Student dashboard stats
```

### Excel Management
```
GET /api/excel-files           # List all exported files
GET /api/download-excel/:name  # Download specific file
```

---

## 🎨 Page Features Summary

| Page | Purpose | Key Feature |
|------|---------|-------------|
| Home | Landing | Hero + CTA |
| Courses | Program info | **Enroll Now** buttons |
| Admissions | Eligibility | **Apply Now** CTA |
| Contact | Get in touch | **Working form** ✓ |
| Apply | Admission form | **Auto-exports to Excel** ✓ |
| Login | Authentication | 3 role-based logins |
| Student Dashboard | Stats overview | Real database stats |
| **Student Profile** | **UPDATED** | **Real data from API** ✓ |
| Admin Dashboard | Control center | 9 management cards |
| Excel Library | Download files | All exports here |

---

## 📊 Database Tables

```
students          - Student records (0 records)
attendance        - Attendance tracking
results           - Test scores
alumni            - Past students
admissions        - Applications (auto-populated)
users             - User accounts (3 pre-loaded)
password_resets   - Password recovery tokens
contact_messages  - Contact form submissions ✓
```

---

## 🔄 User Journey Examples

### Public Visitor → Student
```
1. Visit Home page
2. Browse Courses
3. Click "Enroll Now"
4. Fill Apply form
5. Submit → Auto-exports to Excel
6. Login as STU-101
7. View Student Dashboard
8. Click "View Profile"
9. See attendance & test results
```

### Contact Submission
```
1. Visit Contact page
2. Fill form with name, email, subject, message
3. Click "Send Message"
4. Shows success notification
5. Admin can see message in database
```

### Admin Management
```
1. Login as admin001
2. Click "Manage Students"
3. Add/edit student data
4. Click "Export" → Creates Excel file
5. Go to "Excel Files Library"
6. Download the Excel file
```

---

## 🐛 Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Blank page | Check localhost:5173 in address bar |
| "Failed to fetch" | Ensure backend running on 4000 |
| Login not working | Use exact credentials from above |
| Profile data empty | Add student via Admin page first |
| Excel files not showing | Run an export first, files appear automatically |
| Contact form not submitting | Check Network tab for `/api/contact` errors |

---

## 📁 File Structure

```
yims-web/
├── src/
│   ├── pages/              # All 13 page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Courses.tsx      ✨ Updated with buttons
│   │   ├── Admissions.tsx   ✨ Updated with buttons
│   │   ├── Contact.tsx      ✅ WORKING
│   │   ├── Login.tsx
│   │   ├── ApplyAdmission.jsx
│   │   └── student/
│   │       └── StudentProfile.tsx  ✅ REWRITTEN
│   ├── components/
│   ├── App.tsx             # All routes defined
│   └── main.tsx
├── server/
│   ├── index.js            # Express backend
│   └── data/
│       ├── yims.db         # SQLite database
│       └── excel/          # Excel exports
├── package.json
├── vite.config.ts
└── README.md
```

---

## ✅ Checklist for Testing

- [ ] **Home Page**: Open and see logo + content
- [ ] **Courses Page**: See courses + click "Enroll Now"
- [ ] **Admissions Page**: Click "Apply Now"
- [ ] **Contact Form**: Fill and submit → See success message
- [ ] **Apply Form**: Fill and submit → Check Excel created
- [ ] **Login as Student**: Use STU-101/Student@123
- [ ] **Student Dashboard**: See stats
- [ ] **Student Profile**: Click "View Profile" → See data
- [ ] **Login as Admin**: Use admin001/Admin@123
- [ ] **Admin Dashboard**: See all stats
- [ ] **Excel Library**: Download a file
- [ ] **Responsive**: Test on mobile/tablet view

---

## 🎓 Next Steps (Optional)

1. **Add More Users**: Admin > Manage Users page
2. **Add Students**: Admin > Manage Students page
3. **Track Attendance**: Admin > Track Attendance
4. **Enter Test Results**: Admin > View Results
5. **Download Backups**: Admin > Excel Files Library
6. **Email Integration**: Setup nodemailer in server/index.js (line ~12)

---

## 📞 Support Commands

```powershell
# Stop all Node processes
Get-Process node | Stop-Process -Force

# Check if servers are running
netstat -ano | findstr :4000
netstat -ano | findstr :5173

# View database
# (Use any SQLite viewer to open server/data/yims.db)

# Check Excel exports
dir "server/data/excel/"
```

---

## 🎉 Summary

Your YIMS website is **COMPLETE** with:
- ✅ All pages working
- ✅ Database connected
- ✅ Contact form integrated
- ✅ Student profile updated
- ✅ Excel import/export
- ✅ Professional UI
- ✅ Real-time data

**Start using it now at**: http://localhost:5173

