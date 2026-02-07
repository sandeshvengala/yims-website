# YIMS Excel Files Directory

This folder stores all Excel files exported from the YIMS system for easy access and backup.

## 📁 Exported Files

When you export data from any management page, Excel files are automatically saved here:

- **students.xlsx** - Student records (ID, name, phone, course, admission date, status)
- **attendance.xlsx** - Attendance records (student ID, date, status, notes)
- **results.xlsx** - Exam results (student ID, exam, score, result date)
- **alumni.xlsx** - Past students/alumni (student ID, name, year, placement)
- **admissions.xlsx** - Admission applications (student name, guardian, phone, course, address, date, status)
- **users.xlsx** - User accounts (ID, role, identifier, email)

## 📋 Excel File Formats

### Users.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Auto-generated database ID | No | 1 |
| role | User role | Yes | admin, staff, or student |
| identifier | Login ID/username | Yes | admin001, staff001, STU-101 |
| email | Email address | Required for admin/staff | admin@yims.local |
| password | Password (only needed for new users or updates) | For new users | Admin@123 |

**Important Notes for Users Import:**
- Password column is required when creating new users
- For existing users, you can update email without providing password
- If password is provided for existing users, it will be updated
- Students can use their ID card number as identifier

### Students.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Database ID | No | 1 |
| studentId | Unique student identifier | Yes | STU-101 |
| name | Student full name | Yes | John Doe |
| phone | Contact number | No | 9876543210 |
| course | Enrolled course | No | SSC-2024 |
| admissionDate | Date of admission | No | 2024-01-15 |
| status | Enrollment status | No | Active |

### Attendance.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Database ID | No | 1 |
| studentId | Student identifier | Yes | STU-101 |
| date | Attendance date | Yes | 2024-02-05 |
| status | Attendance status | Yes | Present, Absent, Leave |
| notes | Additional notes | No | Medical leave |

### Results.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Database ID | No | 1 |
| studentId | Student identifier | Yes | STU-101 |
| exam | Exam name | Yes | Mid-term 2024 |
| score | Exam score | Yes | 85 |
| resultDate | Result declaration date | No | 2024-02-05 |

### Alumni.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Database ID | No | 1 |
| studentId | Student identifier | Yes | STU-101 |
| name | Alumni name | Yes | John Doe |
| year | Graduation year | No | 2023 |
| placement | Job placement info | No | ABC Company |

### Admissions.xlsx Format
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| id | Database ID | No | 1 |
| studentName | Applicant full name | Yes | John Doe |
| guardianName | Father/Guardian name | Yes | Mike Doe |
| phone | Contact number | Yes | 9876543210 |
| course | Desired course | Yes | SSC (Secondary School Certificate) |
| address | Residential address | Yes | 123 Main St, City |
| applicationDate | Date of application | No | 2024-02-05 |
| status | Application status | No | Pending, Approved, Rejected |

## 🔄 Import/Export Workflow

### Exporting Data
1. Navigate to any management page (e.g., Manage Students, Manage Users)
2. Click the "Export to Excel" button
3. File is automatically downloaded AND saved to this folder
4. Use the downloaded file for offline editing

### Importing Data
1. Edit the Excel file with your data
2. Navigate to the corresponding management page
3. Click "Import Excel" button
4. Select your edited Excel file
5. Data will be imported/updated in the database

**Update Rules:**
- If a record with the same ID exists, it will be updated
- If no ID is provided, a new record will be created
- For upsert operations, the system uses unique keys (e.g., studentId for students)

## 🔐 User Account Management via Excel

You can manage all user accounts (admin, staff, students) through Excel:

1. **Export current users:** Go to Admin > Manage User Accounts > Export Users to Excel
2. **Edit Excel file:** Add new users or update existing ones
   - New users: Provide role, identifier, email (for admin/staff), password
   - Update existing: Keep the ID, modify other fields as needed
3. **Import updated file:** Click "Import Users from Excel" button
4. **Verification:** Check the "Existing User Accounts" section on the page

## 📂 File Location

Physical path on server: `server/data/excel/`

All exports are automatically stored here for:
- Easy backup and archival
- Bulk data management
- Offline data analysis
- System migration support

## ⚠️ Important Notes

1. **Backup regularly:** Keep copies of Excel files before importing new data
2. **Data validation:** Ensure required fields are filled before importing
3. **Password security:** User passwords are hashed in database, plain text only in Excel during import
4. **Date format:** Use YYYY-MM-DD format for dates
5. **Unique constraints:** Duplicate studentId or user identifier will cause errors

## 🔗 Access from Application

- **Admin Dashboard** → Manage Students → Export/Import
- **Admin Dashboard** → Take Attendance → Export/Import  
- **Admin Dashboard** → Student Results → Export/Import
- **Admin Dashboard** → Past Students → Export/Import
- **Admin Dashboard** → Admission Applications → Export/Import
- **Admin Dashboard** → Manage User Accounts → Export/Import Users
- **Apply for Admission Page** → Public form saves to admissions database

---

For technical support, contact the system administrator.
