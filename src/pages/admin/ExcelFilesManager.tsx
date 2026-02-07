import { useEffect, useState } from "react";

type ExcelFile = {
  name: string;
  size: number;
  date: string;
  downloadUrl: string;
};

export default function ExcelFilesManager() {
  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/excel-files");
        if (response.ok) {
          const data = (await response.json()) as ExcelFile[];
          setFiles(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load files");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDownload = (file: ExcelFile) => {
    window.location.href = file.downloadUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Excel Files Library
          </h1>
          <p className="text-gray-600">
            Download all exported Excel files from your database. Files are automatically saved when you export data.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-12 shadow text-center">
            <p className="text-gray-600 text-lg">Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow text-center space-y-3">
            <p className="text-gray-600 text-lg">No Excel files found</p>
            <p className="text-gray-500 text-sm">
              Export data from any management page to create Excel files here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex items-center justify-between"
              >
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {file.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📦 {formatFileSize(file.size)}</span>
                    <span>📅 {formatDate(file.date)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(file)}
                  className="ml-4 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition whitespace-nowrap flex items-center gap-2"
                >
                  📥 Download
                </button>
              </div>
            ))}
          </div>
        )}

        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-blue-900 text-lg">📋 Available Files</h2>
          <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
            <li><strong>students.xlsx</strong> - Student records and enrollment data</li>
            <li><strong>attendance.xlsx</strong> - Attendance records by date</li>
            <li><strong>results.xlsx</strong> - Exam scores and results</li>
            <li><strong>alumni.xlsx</strong> - Past students and alumni information</li>
            <li><strong>admissions.xlsx</strong> - Admission applications and status</li>
            <li><strong>users.xlsx</strong> - User accounts (admin, staff, students)</li>
          </ul>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-amber-900 text-lg">💡 How to Export Data</h2>
          <ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside">
            <li>Go to any management page (Manage Students, Attendance, etc.)</li>
            <li>Click the "Export to Excel" button</li>
            <li>File downloads AND saves here automatically</li>
            <li>Return to this page to download anytime</li>
          </ol>
        </section>

        <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-emerald-900 text-lg">✅ File Storage Location</h2>
          <p className="text-sm text-emerald-800">
            <strong>Server Path:</strong> <code className="bg-white px-2 py-1 rounded">server/data/excel/</code>
          </p>
          <p className="text-sm text-emerald-800">
            All Excel files are stored securely on the server for backup and easy access.
          </p>
        </section>
      </div>
    </div>
  );
}
