import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: string;
  status: string;
}

interface AttendanceRecord {
  date: string;
  status: string;
}

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch student info
        const studentRes = await fetch(`/api/students?search=${id}`);
        if (!studentRes.ok) throw new Error("Failed to fetch student data");
        const studentData = await studentRes.json();

        if (!studentData || studentData.length === 0) {
          setError("Student not found");
          setLoading(false);
          return;
        }

        setStudent(studentData[0]);

        // Fetch attendance records
        const attendanceRes = await fetch(`/api/attendance`);
        if (attendanceRes.ok) {
          const allAttendance = await attendanceRes.json();
          const studentAttendance = allAttendance.filter(
            (a: any) => a.studentId === id
          );
          setAttendance(studentAttendance);
        }

        // Fetch results
        const resultsRes = await fetch(`/api/results`);
        if (resultsRes.ok) {
          const allResults = await resultsRes.json();
          const studentResults = allResults.filter(
            (r: any) => r.studentId === id
          );
          setResults(studentResults);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    if (id) fetchStudentData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 font-semibold mb-4">
            {error || "Student not found"}
          </p>
          <button
            onClick={() => navigate("/student")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const attendancePercentage =
    attendance.length > 0
      ? (
          (attendance.filter((a) => a.status === "present").length /
            attendance.length) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/student")}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-gray-800">
                {student.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{student.course}</p>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Student ID</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {student.id}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {student.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {student.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="text-lg font-semibold text-green-600">
                    {student.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 min-w-[250px]">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {attendancePercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {attendance.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Attendance Records
          </h2>

          {attendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.slice(-10).map((record, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{record.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.status === "present" ? "✓ Present" : "✗ Absent"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-gray-500 mt-4">
                Showing last 10 records. Total records: {attendance.length}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No attendance records found
            </p>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Test Results
          </h2>

          {results.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {result.subject || "Test"}
                    </h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      {result.marks || "N/A"} / 100
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {result.date || "Date not available"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No test results available yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}