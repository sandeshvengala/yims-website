import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type AdminStats = {
  totalStudents: number;
  activeStaff: number;
  todayAttendance: number;
  totalAlumni: number;
  pendingAdmissions: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    activeStaff: 0,
    todayAttendance: 0,
    totalAlumni: 0,
    pendingAdmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/admin");
        if (response.ok) {
          const data = await response.json() as AdminStats;
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Admin Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Quick access to management tools and student insights.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/apply-admission"
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
            >
              New Admission
            </Link>
            <Link
              to="/admissions"
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
            >
              Admissions Info
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? "..." : stats.totalStudents}
            </p>
            <p className="text-xs text-blue-600 mt-2">Database count</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500">Active Staff</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? "..." : stats.activeStaff}
            </p>
            <p className="text-xs text-blue-600 mt-2">Staff accounts</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500">Attendance Today</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? "..." : stats.todayAttendance}
            </p>
            <p className="text-xs text-blue-600 mt-2">Students present</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500">Alumni</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? "..." : stats.totalAlumni}
            </p>
            <p className="text-xs text-blue-600 mt-2">Past students</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 shadow border-2 border-amber-200">
            <p className="text-sm text-amber-700">Pending Applications</p>
            <p className="text-3xl font-bold text-amber-900">
              {loading ? "..." : stats.pendingAdmissions}
            </p>
            <p className="text-xs text-amber-700 mt-2">Need review</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/students"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Students
            </h3>
            <p className="text-sm text-gray-600">
              Add, update, and organize student profiles.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/staff"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Staff
            </h3>
            <p className="text-sm text-gray-600">
              Maintain staff details, roles, and availability.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/attendance"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Take Attendance
            </h3>
            <p className="text-sm text-gray-600">
              Mark daily attendance and track class status.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/search"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Search Students
            </h3>
            <p className="text-sm text-gray-600">
              Find student records quickly by name or ID.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/results"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Student Results
            </h3>
            <p className="text-sm text-gray-600">
              Upload exam scores and export result sheets.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/alumni"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Past Students
            </h3>
            <p className="text-sm text-gray-600">
              Track alumni outcomes and placements.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/users"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage User Accounts
            </h3>
            <p className="text-sm text-gray-600">
              Create IDs and passwords for admin, staff, students.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/admissions"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Admission Applications
            </h3>
            <p className="text-sm text-gray-600">
              Review applications, update status, export to Excel.
            </p>
            <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/excel-files"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border-2 border-emerald-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📥 Excel Files Library
            </h3>
            <p className="text-sm text-gray-600">
              Download all exported Excel files in one place.
            </p>
            <span className="text-emerald-600 text-sm font-semibold mt-4 inline-block">
              Browse →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}