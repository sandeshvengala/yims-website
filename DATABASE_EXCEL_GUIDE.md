# YIMS - Database & Excel Integration Guide

## 🎯 Overview

All dashboards now display **real-time data from the database**, defaulting to 0 when no data exists. Excel import/export functionality is available for all data entities including user accounts.

## 📊 Dashboard Statistics

### Admin Dashboard
- **Total Students**: Count from students table (defaults to 0)
- **Active Staff**: Count of staff users (defaults to 0)
- **Attendance Today**: Count of today's attendance records (defaults to 0)
- **Alumni**: Count from alumni table (defaults to 0)

### Staff Dashboard
- **Classes Today**: Unique students with attendance today (defaults to 0)
- **Pending Queries**: Placeholder for future implementation (currently 0)
- **Average Attendance**: Weekly attendance percentage (defaults to 0)

### Student Dashboard (Personalized)
- **Attendance**: Student's attendance percentage (defaults to 0)
- **Assignments**: Placeholder for future implementation (currently 0)
- **Fees Status**: Placeholder (currently shows "Paid")

## 📁 Excel Files Location

**Server Path:** `server/data/excel/`

All exported Excel files are automatically saved to this folder for easy access:
- students.xlsx
- attendance.xlsx
- results.xlsx
- alumni.xlsx
- users.xlsx

## 🔄 How to Use Excel Import/Export

### For Students, Attendance, Results, Alumni

1. **Export Data:**
   - Navigate to the management page (e.g., Admin > Manage Students)
   - Click "Export to Excel" button
   - File downloads AND saves to server/data/excel/ folder

2. **Edit Data:**
   - Open the Excel file
   - Add new rows or modify existing data
   - Keep the 'id' column for updates, or leave blank for new records

3. **Import Data:**
   - Go back to the management page
   - Click "Import Excel" button
   - Select your edited file
   - Data will be imported/updated automatically

### For User Accounts (IDs & Passwords)

1. **Export Users:**
   - Go to Admin Dashboard > Manage User Accounts
   - Click "Export Users to Excel"
   - File saves to server/data/excel/users.xlsx

2. **Edit Users:**
   - Open users.xlsx
   - Add new users with columns: role, identifier, email, password
   - For existing users: keep ID, update other fields as needed
   - Password is required only for new users

3. **Import Users:**
   - Click "Import Users from Excel" button
   - Select your edited file
   - Users will be created/updated with hashed passwords

## 📋 Excel File Formats

### users.xlsx
```
| id | role    | identifier | email             | password   |
|----|---------|------------|-------------------|------------|
| 1  | admin   | admin001   | admin@yims.local  | Admin@123  |
| 2  | staff   | staff001   | staff@yims.local  | Staff@123  |
| 3  | student | STU-101    | student@yims.local| Student@123|
```

### students.xlsx
```
| id | studentId | name     | phone      | course    | admissionDate | status |
|----|-----------|----------|------------|-----------|---------------|--------|
| 1  | STU-101   | John Doe | 9876543210 | SSC-2024  | 2024-01-15    | Active |
```

### attendance.xlsx
```
| id | studentId | date       | status  | notes        |
|----|-----------|------------|---------|--------------|
| 1  | STU-101   | 2024-02-05 | Present | On time      |
```

### results.xlsx
```
| id | studentId | exam          | score | resultDate |
|----|-----------|---------------|-------|------------|
| 1  | STU-101   | Mid-term 2024 | 85    | 2024-02-05 |
```

### alumni.xlsx
```
| id | studentId | name     | year | placement    |
|----|-----------|----------|------|--------------|
| 1  | STU-100   | Jane Doe | 2023 | ABC Company  |
```

## 🔐 User Account Management

### Default Seeded Accounts
These are created automatically on server start:

- **Admin**: admin001 / Admin@123 / admin@yims.local
- **Staff**: staff001 / Staff@123 / staff@yims.local
- **Student**: STU-101 / Student@123 / student@yims.local

### Creating New Accounts

**Method 1: Web Interface**
1. Admin Dashboard > Manage User Accounts
2. Fill in the form
3. Click "Create User Account"

**Method 2: Excel Import**
1. Export current users.xlsx
2. Add new rows with required fields
3. Import the updated file

### Password Management
- Admin/Staff: Can reset via "Forgot password?" link (email required)
- Students: Contact admin for password reset
- Passwords are hashed in database for security
- Plain text passwords only used during Excel import

## 🚀 Quick Access Guide

### Admin Features
```
/admin                    → Dashboard with live stats
/admin/students           → Manage Students (Excel import/export)
/admin/staff              → Manage Staff
/admin/attendance         → Attendance (Excel import/export)
/admin/results            → Results (Excel import/export)
/admin/alumni             → Alumni (Excel import/export)
/admin/users              → User Accounts (Excel import/export)
/admin/search             → Search Students (read-only)
```

### Staff Features
```
/staff                    → Dashboard with live stats
/admin/attendance         → Take Attendance
/admin/search             → Search Students
```

### Student Features
```
/student                  → Dashboard with personalized stats
/student/:id              → Personal Profile
```

## 📡 API Endpoints

### Statistics
- `GET /api/stats/admin` - Admin dashboard stats
- `GET /api/stats/staff` - Staff dashboard stats
- `GET /api/stats/student/:studentId` - Student-specific stats

### Data Management
- `GET /api/:entity` - List all records
- `POST /api/:entity` - Create new record
- `PUT /api/:entity/:id` - Update record
- `DELETE /api/:entity/:id` - Delete record
- `GET /api/:entity/export` - Export to Excel
- `POST /api/:entity/import` - Import from Excel

Entities: students, attendance, results, alumni

### User Management
- `POST /api/users` - Create user
- `GET /api/users-list` - List all users
- `GET /api/users/export` - Export users to Excel
- `POST /api/users/import` - Import users from Excel

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/request-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password

## ⚡ Server Status

### Backend Server
- Port: 4000
- Database: server/data/yims.db
- Excel Folder: server/data/excel/
- Status: Running in separate PowerShell window

### Frontend Server
- Port: 5174 (or 5173)
- Proxy: /api → http://localhost:4000
- Status: Running with hot reload

## 🔧 Troubleshooting

### Dashboard shows 0 for everything
- Cause: No data in database
- Solution: Add sample data via management pages or import Excel files

### Excel import fails
- Check file format matches expected columns
- Ensure required fields are filled
- Verify passwords for new users

### Cannot login with default accounts
- Ensure backend server is running
- Check server console for seed messages
- Verify database exists at server/data/yims.db

### Excel file not found in folder
- Export creates files in server/data/excel/
- Check folder permissions
- Ensure server has write access

## 📝 Notes

1. All Excel exports automatically save to server/data/excel/ folder
2. Dashboard stats update in real-time on page load
3. Stats default to 0 when database is empty
4. Password hashing ensures security even with Excel import
5. Files in excel folder serve as backups and migration support

---

**Last Updated:** February 5, 2026
**System Version:** YIMS v1.0 with Database Integration
