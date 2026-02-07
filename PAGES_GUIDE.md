# YIMS Website - Complete Pages Guide

## Overview
This document outlines all pages in the YIMS website, their functionality, data connections, and navigation flow.

---

## 📄 Public Pages (No Login Required)

### 1. **Home Page** (`/`)
- **Purpose**: Landing page with website overview
- **Features**:
  - Hero section with call-to-action
  - 3 feature cards (Expert Faculty, Modern Labs, Placement Support)
  - About YIMS section with founder information
  - "Start Your Journey" CTA button
- **Linked Content**: 
  - Logo links back to Home
  - Hero CTA and footer links to Admissions page

### 2. **About Page** (`/about`)
- **Purpose**: Detailed information about YIMS institute
- **Features**:
  - Mission and vision statements
  - Teaching approach and values
  - Founder information and background
- **Linked Content**:
  - Accessible from Navbar
  - Links to Courses and Admissions pages

### 3. **Courses Page** (`/courses`)
- **Purpose**: Display all available coaching programs
- **Content**:
  - **SSC Program**: Complete syllabus coverage, concept-based learning, chapter tests
  - **Polytechnic Entrance**: Math/Physics/Chemistry, previous year papers, mock tests
  - **Government Exams**: Aptitude, reasoning, general knowledge, interviews
- **Key Features**:
  - "What we cover" section for each course
  - "Best for" section highlighting target students
  - **Enroll Now buttons** on each course card → Links to Apply Admission
  - "Why Choose Us" section with 6 key benefits
  - **CTA Buttons**: "Apply Now" and "Learn More"
- **Navigation**:
  - Accessible from Navbar
  - "Enroll Now" buttons link to `/apply-admission`
  - "Apply Now" big button links to `/apply-admission`
  - "Learn More" button links to `/admissions`

### 4. **Admissions Page** (`/admissions`)
- **Purpose**: Admission process and eligibility information
- **Sections**:
  - **Course Eligibility**: 3 courses with requirements
  - **Admission Process**: 4-step process visualization
  - **Documents Required**: List of required documents
  - **CTA Section**: "Apply Now" button → `/apply-admission`
  - **Contact Link**: "Contact Us" button → `/contact`
- **Key Data**:
  - SSC: For 9th/10th class students
  - Polytechnic: For 10th class students
  - Government Exams: For various qualification levels
- **Navigation**:
  - Accessible from Home, Navbar, and Courses pages
  - "Apply Now" button leads to admission form

### 5. **Contact Page** (`/contact`)
- **Purpose**: Contact information and message submission
- **Features**:
  - Contact info cards: Address, Phone, Email
  - **Working Contact Form** with:
    - Name input
    - Email input
    - Subject line
    - Message textarea
  - Address: Yogeshwara Institute, Gandhinagar, Sircilla, Telangana
  - Phone: +91 95333 08928
  - Email: yogeshwara475@gmail.com
  - **Google Maps Embed**: Shows YIMS location
- **Form Handling**:
  - Validates all required fields
  - Submits to `/api/contact` endpoint
  - Stores in `contact_messages` database table
  - Shows success/error messages
  - Auto-clears form on successful submission
- **Navigation**:
  - Accessible from Navbar
  - "Contact Us" link from other pages

### 6. **Apply Admission Page** (`/apply-admission`)
- **Purpose**: Student admission application form
- **Form Fields**:
  - Student Name
  - Guardian/Parent Name
  - Phone Number
  - Course Selection (dropdown)
  - Address (textarea)
- **Features**:
  - Form validation
  - Success/error messages
  - **Auto-exports to Excel** after submission
  - Redirects to home after 3 seconds
  - Stores in `admissions` database table
- **Auto-Export**:
  - Creates Excel file with admission data
  - Saves to `server/data/excel/` folder
  - Accessible from Excel Files Library in Admin Dashboard

### 7. **Login Page** (`/login`)
- **Purpose**: User authentication for all roles
- **Role Selection**: Dropdown to choose Admin/Staff/Student
- **Credentials Required**:
  - **Admin**: ID (admin001), Password (Admin@123)
  - **Staff**: ID (staff001), Password (Staff@123)
  - **Student**: Student ID Card Number (STU-101), Password (Student@123)
- **Features**:
  - Role-based login
  - "Forgot Password?" link → `/reset-password`
  - Error messages for invalid credentials
  - Redirects to respective dashboard after login
- **Navigation**:
  - Accessible from Navbar (when not logged in)
  - "Login" button appears at top-right
  - Login links from Apply Admission and Student Dashboard

### 8. **Reset Password Page** (`/reset-password`)
- **Purpose**: Password recovery flow
- **Two Steps**:
  1. **Request Reset**: Enter role and email
     - Sends email with reset token (if configured)
     - Token stored in `password_resets` table
  2. **Reset Password**: Enter token and new password
     - Validates token expiry
     - Updates `users` table with new password
- **Features**:
  - Token-based security
  - Email notification (backend ready)
  - Success/error messages
- **Navigation**:
  - Accessible from Login page "Forgot Password?" link

---

## 🔐 Protected Pages (Login Required)

### 9. **Student Dashboard** (`/student`)
- **Purpose**: Student home page with overview and stats
- **Visible To**: Students (after login with STU-101)
- **Real-Time Stats** (from database):
  - Total classes attended
  - Attendance percentage
  - Tests completed
  - Current GPA/Performance
- **Navigation Cards**:
  - **View Profile**: Links to `/student/:id` (StudentProfile)
  - **My Attendance**: Shows daily attendance records
  - **My Results**: Shows test scores and grades
  - **Download Resources**: Links to course materials
  - **Contact Support**: Links to Help page
- **Data Source**:
  - Stats from `/api/stats/student/:studentId` API
  - Updates when new attendance/results added

### 10. **Student Profile Page** (`/student/:id`)
- **Purpose**: Detailed student information and performance tracking
- **Visible To**: Student viewing own profile
- **Features**:
  - **Student Information**:
    - Name, Email, Phone, Student ID
    - Course, Enrollment Status
    - Date of enrollment
  - **Quick Stats Card**:
    - Attendance % (calculated from records)
    - Total Classes Attended
    - Tests Completed
  - **Attendance Records Table**:
    - Shows last 10 attendance records
    - Date and Present/Absent status
    - Color-coded (green for present, red for absent)
  - **Test Results Section**:
    - Subject/Test name
    - Score out of 100
    - Test date
    - Grid layout for easy viewing
- **Loading State**: Spinner while fetching data
- **Error Handling**: Shows error message if student not found
- **Back Button**: Returns to Student Dashboard
- **Data Source**:
  - Fetches from `/api/students` API
  - Filters by student ID from URL params
  - Gets attendance from `/api/attendance`
  - Gets results from `/api/results`

### 11. **Staff Dashboard** (`/staff`)
- **Purpose**: Staff member home page and tools
- **Visible To**: Staff (after login with staff001)
- **Real-Time Stats** (from database):
  - Total students assigned
  - Classes scheduled today
  - Attendance recorded today
  - Performance insights
- **Management Cards**:
  - **Mark Attendance**: Add/edit daily attendance
  - **Record Results**: Enter test scores
  - **Manage Students**: View student list
  - **View Resources**: Access teaching materials
  - **Reports**: Generate performance reports
- **Data Source**:
  - Stats from `/api/stats/staff` API
  - Can edit attendance and results
  - Student data from `/api/students` API

### 12. **Admin Dashboard** (`/admin`)
- **Purpose**: Admin control center for entire system
- **Visible To**: Admin (after login with admin001)
- **Real-Time Stats** (from database):
  - Total Students Count
  - Active Staff Count
  - Today's Attendance Count
  - Total Alumni Count
  - Pending Admissions Count
- **9 Management Cards**:
  1. **Manage Students** → `/admin/students`
  2. **Manage Staff** → `/admin/staff`
  3. **Track Attendance** → `/admin/attendance`
  4. **Search Students** → `/admin/search`
  5. **Student Results** → `/admin/results`
  6. **Alumni Management** → `/admin/alumni`
  7. **Manage Users** → `/admin/users`
  8. **Admissions** → `/admin/admissions`
  9. **Excel Files Library** → `/admin/excel-files`
- **Data Source**:
  - Stats from `/api/stats/admin` API
  - All CRUD operations available
  - Excel import/export for all entities

### 13. **Admin Pages** (Detailed Management)
- **`/admin/students`**: View, add, edit, delete students (with Excel import/export)
- **`/admin/staff`**: Manage staff members
- **`/admin/attendance`**: Daily attendance records (Excel sync)
- **`/admin/search`**: Quick search for students by ID/name
- **`/admin/results`**: Student test results and grades (Excel sync)
- **`/admin/alumni`**: Past students and placement records
- **`/admin/users`**: Create user accounts, assign IDs and passwords
  - Can import user list from Excel
  - Can export all users to Excel
- **`/admin/admissions`**: Review and manage admission applications
  - Auto-exports new applications to Excel
  - Update status (Pending, Approved, Rejected)
- **`/admin/excel-files`**: Download all exported Excel files
  - Lists all Excel files from exports
  - Shows file size and export date
  - Direct download buttons
  - File organization by entity type

---

## 🔄 User Journey Flows

### Public Visitor Flow
```
Home (/) 
  ↓
  ├→ About (/about)
  ├→ Courses (/courses) → "Enroll Now" buttons
  ├→ Admissions (/admissions) → "Apply Now" button
  └→ Contact (/contact)
        ↓
Apply Admission (/apply-admission) [Form submits to DB + Excel]
  ↓
Login (/login) [Choose Student role]
  ↓
Student Dashboard (/student)
  ↓
Student Profile (/student/:id)
```

### Student Flow (After Login)
```
Student Dashboard (/student)
  ↓
  ├→ View Profile → Student Profile (/student/:id)
  ├→ My Attendance → Sees attendance records
  ├→ My Results → Sees test scores
  └→ Back to Dashboard
```

### Admin Flow
```
Login (/login) [Choose Admin role]
  ↓
Admin Dashboard (/admin)
  ↓
  ├→ Manage Students (/admin/students)
  ├→ Track Attendance (/admin/attendance)
  ├→ Student Results (/admin/results)
  ├→ Manage Users (/admin/users)
  ├→ View Admissions (/admin/admissions)
  │     └→ (Auto-exported to Excel on new submissions)
  └→ Excel Files Library (/admin/excel-files)
        └→ Download all exported files
```

---

## 🗄️ Database Integration

### Tables & Connected Pages

| Table | Purpose | Connected Pages | Features |
|-------|---------|-----------------|----------|
| `students` | Student records | Student Dashboard, Student Profile, Admin/Students | Real data in profiles |
| `attendance` | Daily attendance | Staff Dashboard, Admin/Attendance, Student Profile | Auto-tracked percentage |
| `results` | Test scores | Admin/Results, Student Profile | Displayed in profile |
| `alumni` | Past students | Admin/Alumni | Placement tracking |
| `admissions` | Admission forms | Apply Admission, Admin/Admissions | Auto-export to Excel |
| `users` | User accounts | Login, Admin/Users | Role-based access |
| `password_resets` | Password recovery | Reset Password page | Token-based reset |
| `contact_messages` | Contact form submissions | Contact page | Stored in DB |

### API Endpoints

**Public Endpoints:**
- `POST /api/contact` - Submit contact form
- `POST /api/auth/login` - User login
- `POST /api/auth/request-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/admissions` - Submit admission form

**Protected Endpoints:**
- `GET /api/:entity` - Get all records (students, attendance, results, etc.)
- `GET /api/:entity/:id` - Get specific record
- `POST /api/:entity` - Create new record
- `PUT /api/:entity/:id` - Update record
- `DELETE /api/:entity/:id` - Delete record
- `POST /api/:entity/import` - Import from Excel
- `GET /api/:entity/export` - Export to Excel
- `GET /api/stats/admin` - Admin statistics
- `GET /api/stats/staff` - Staff statistics
- `GET /api/stats/student/:id` - Student statistics
- `GET /api/excel-files` - List all exported Excel files
- `GET /api/download-excel/:filename` - Download specific Excel file

---

## 📊 Excel Files Management

### Auto-Export Features
1. **Admission Forms**: Auto-exported when form submitted
2. **Student Management**: Export from Admin Students page
3. **Attendance Records**: Export from Attendance page
4. **Test Results**: Export from Results page
5. **User Accounts**: Export from Users page
6. **Alumni Records**: Export from Alumni page

### Excel Files Library (`/admin/excel-files`)
- Lists all exported Excel files
- Shows file size in human-readable format (KB, MB)
- Shows export date and time
- **Direct Download Buttons** for each file
- File organization by entity type
- Files stored in: `server/data/excel/`

---

## 🎨 Navigation Structure

### Navbar (Visible to All)
- **Logo**: Links to Home
- **Menu Items** (Changes based on login status):
  - **Not Logged In**: Home, About, Courses, Admissions, Contact, Login
  - **Student Logged In**: Home, Dashboard, Profile, Logout
  - **Staff Logged In**: Home, Dashboard, Manage Attendance, Logout
  - **Admin Logged In**: Home, Dashboard, All Management Links, Logout

### Footer (All Pages)
- Quick Links: Home, About, Courses, Admissions, Contact
- Institute Info: Address, Phone, Email
- Social Links (if configured)
- Copyright information

---

## 🔐 Security & Access Control

### Authentication
- **Credentials stored** in `users` table with bcryptjs hashing
- **Tokens stored** in localStorage on client side
- **ProtectedRoute** component ensures only authenticated users access protected pages
- **Role-based access** prevents cross-role access

### Default Test Accounts
```
Admin:    admin001 / Admin@123
Staff:    staff001 / Staff@123
Student:  STU-101 / Student@123
```

---

## ✅ Testing Checklist

Use these credentials to test complete user journeys:

### Public Pages Test
- [ ] Navigate Home → Courses → Courses "Enroll Now" button
- [ ] Navigate Home → Admissions → "Apply Now" button
- [ ] Fill Apply Admission form → Should show success message
- [ ] Check Excel file created in Admin Excel Library
- [ ] Submit Contact form → Should show success message
- [ ] Check contact message in database

### Student Flow Test
- [ ] Login as Student (STU-101 / Student@123)
- [ ] Check Student Dashboard stats
- [ ] Click "View Profile" → Should show Student Profile with real data
- [ ] Check attendance records in profile
- [ ] Check test results in profile

### Admin Flow Test
- [ ] Login as Admin (admin001 / Admin@123)
- [ ] Check Dashboard stats
- [ ] Navigate to Excel Files Library
- [ ] Verify admission forms exported to Excel
- [ ] Download Excel files
- [ ] Check all management pages functional

---

## 🐛 Troubleshooting

### Pages Not Loading Data
1. **Check Backend**: Ensure `http://localhost:4000` is running
2. **Check Browser Console**: Look for CORS or fetch errors
3. **Check Database**: Verify tables exist in SQLite

### Contact Form Not Working
1. Check `/api/contact` endpoint is responding
2. Verify `contact_messages` table exists in database
3. Check browser network tab for POST requests

### Student Profile Showing Empty
1. Ensure student ID exists in database
2. Check attendance and results tables for that student
3. Verify API endpoints `/api/students`, `/api/attendance`, `/api/results`

---

## 📝 Notes

- All pages have responsive design (mobile, tablet, desktop)
- Color scheme: Blue (#0066CC) for primary, Gray for secondary
- Forms include validation and error handling
- All data operations persist to SQLite database
- Excel exports include headers and formatting
- Auto-export happens after successful form submission

