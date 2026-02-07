import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type StaffStats = {
  classesToday: number;
  pendingQueries: number;
  avgAttendance: number;
};

export default function StaffDashboard() {
  const [stats, setStats] = useState<StaffStats>({
    classesToday: 0,
    pendingQueries: 0,
    avgAttendance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/staff");
        if (response.ok) {
          const data = await response.json() as StaffStats;
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
    <div className="min-h-screen bg-slate-50 px-6 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">
              Staff Portal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Staff Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Manage attendance and support student queries.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50"
          >
            Need Help?
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-slate-500">Classes Today</p>
            <p className="text-3xl font-bold text-slate-900">
              {loading ? "..." : stats.classesToday}
            </p>
            <p className="text-xs text-emerald-600 mt-2">Students attended</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-slate-500">Pending Queries</p>
            <p className="text-3xl font-bold text-slate-900">
              {loading ? "..." : stats.pendingQueries}
            </p>
            <p className="text-xs text-amber-600 mt-2">Review today</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-slate-500">Average Attendance</p>
            <p className="text-3xl font-bold text-slate-900">
              {loading ? "..." : `${stats.avgAttendance}%`}
            </p>
            <p className="text-xs text-blue-600 mt-2">This week</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/admin/attendance"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Take Attendance
            </h3>
            <p className="text-sm text-slate-600">
              Mark attendance for today’s batches.
            </p>
            <span className="text-emerald-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/admin/search"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Search Students
            </h3>
            <p className="text-sm text-slate-600">
              Find profiles and handle student requests.
            </p>
            <span className="text-emerald-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/courses"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Course Catalog
            </h3>
            <p className="text-sm text-slate-600">
              Review courses and batch schedules.
            </p>
            <span className="text-emerald-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
          <Link
            to="/apply-admission"
            className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              New Admission
            </h3>
            <p className="text-sm text-slate-600">
              Help a student submit an application.
            </p>
            <span className="text-emerald-600 text-sm font-semibold mt-4 inline-block">
              Open →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}