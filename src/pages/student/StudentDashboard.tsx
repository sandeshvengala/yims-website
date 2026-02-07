import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type StudentStats = {
  attendancePercent: number;
  assignmentsCount: number;
  feesStatus: string;
};

const getStudentId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("yimsUser") ?? "null") as
      | { identifier?: string }
      | null;
    return user?.identifier ?? "101";
  } catch {
    return "101";
  }
};

export default function StudentDashboard() {
  const studentId = getStudentId();
  const [stats, setStats] = useState<StudentStats>({
    attendancePercent: 0,
    assignmentsCount: 0,
    feesStatus: "Unknown",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats/student/${studentId}`);
        if (response.ok) {
          const data = await response.json() as StudentStats;
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [studentId]);

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-indigo-600 font-semibold">
              Student Space
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track attendance, courses, and your application status.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
          >
            Contact Support
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-50 rounded-2xl p-6">
            <p className="text-sm text-indigo-700">Attendance</p>
            <p className="text-3xl font-bold text-indigo-900">
              {loading ? "..." : `${stats.attendancePercent}%`}
            </p>
            <p className="text-xs text-indigo-700 mt-2">Last updated today</p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-6">
            <p className="text-sm text-emerald-700">Assignments</p>
            <p className="text-3xl font-bold text-emerald-900">
              {loading ? "..." : stats.assignmentsCount}
            </p>
            <p className="text-xs text-emerald-700 mt-2">Due this week</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6">
            <p className="text-sm text-amber-700">Fees Status</p>
            <p className="text-3xl font-bold text-amber-900">
              {loading ? "..." : stats.feesStatus}
            </p>
            <p className="text-xs text-amber-700 mt-2">Next due in 30 days</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to={`/student/${studentId}`}
            className="group bg-gray-50 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View My Profile
            </h3>
            <p className="text-sm text-gray-600">
              See attendance, fees, and personal details.
            </p>
            <span className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/courses"
            className="group bg-gray-50 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Browse Courses
            </h3>
            <p className="text-sm text-gray-600">
              Explore SSC, Polytechnic, and Govt. exam prep.
            </p>
            <span className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admissions"
            className="group bg-gray-50 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Admission Info
            </h3>
            <p className="text-sm text-gray-600">
              Check admission requirements and timelines.
            </p>
            <span className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/apply-admission"
            className="group bg-gray-50 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Apply for Admission
            </h3>
            <p className="text-sm text-gray-600">
              Submit or update your application form.
            </p>
            <span className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}