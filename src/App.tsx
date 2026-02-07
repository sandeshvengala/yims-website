import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ApplyAdmission from "./pages/ApplyAdmission.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import ManageStudents from "./pages/admin/ManageStudents.tsx";
import ManageStaff from "./pages/admin/ManageStaff.tsx";
import Attendance from "./pages/admin/Attendance.tsx";
import SearchStudents from "./pages/admin/SearchStudents.tsx";
import Results from "./pages/admin/Results.tsx";
import PastStudents from "./pages/admin/PastStudents.tsx";
import ManageUsers from "./pages/admin/ManageUsers.tsx";
import ManageAdmissions from "./pages/admin/ManageAdmissions.tsx";
import ExcelFilesManager from "./pages/admin/ExcelFilesManager.tsx";
import StaffDashboard from "./pages/staff/StaffDashboard.tsx";
import StudentDashboard from "./pages/student/StudentDashboard.tsx";
import StudentProfile from "./pages/student/StudentProfile.tsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Normal pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/apply-admission" element={<ApplyAdmission />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute role="admin">
              <ManageStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute role="admin">
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/search"
          element={
            <ProtectedRoute role="admin">
              <SearchStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <ProtectedRoute role="admin">
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/alumni"
          element={
            <ProtectedRoute role="admin">
              <PastStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admissions"
          element={
            <ProtectedRoute role="admin">
              <ManageAdmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/excel-files"
          element={
            <ProtectedRoute role="admin">
              <ExcelFilesManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute role="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/:id"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
