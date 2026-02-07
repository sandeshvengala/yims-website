import AdminDataManager from "../../components/AdminDataManager";
import { useState } from "react";

export default function ManageUsers() {
  const [newUser, setNewUser] = useState({
    role: "student",
    identifier: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Failed to create user");
      }

      setMessage("User created successfully!");
      setNewUser({ role: "student", identifier: "", email: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    }
  };

  const handleExportUsers = () => {
    window.location.href = "/api/users/export";
  };

  const handleImportUsers = async (file?: File | null) => {
    if (!file) return;
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/users/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to import users");
      }

      setMessage("Users imported successfully! Page will refresh.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import users");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Manage User Accounts
          </h1>
          <p className="text-gray-600">
            Create and manage login credentials for admin, staff, and students.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="button"
              onClick={handleExportUsers}
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Export Users to Excel
            </button>
            <label className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 cursor-pointer">
              Import Users from Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(event) => handleImportUsers(event.target.files?.[0])}
              />
            </label>
          </div>
        </header>

        <section className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New User Account
          </h2>

          {message && (
            <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(event) =>
                    setNewUser({ ...newUser, role: event.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {newUser.role === "student"
                    ? "Student ID Card Number"
                    : newUser.role === "staff"
                    ? "Staff ID"
                    : "Admin ID"}
                </label>
                <input
                  value={newUser.identifier}
                  onChange={(event) =>
                    setNewUser({ ...newUser, identifier: event.target.value })
                  }
                  placeholder={
                    newUser.role === "student"
                      ? "STU-101"
                      : newUser.role === "staff"
                      ? "staff001"
                      : "admin001"
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email {newUser.role === "student" && "(Optional)"}
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(event) =>
                    setNewUser({ ...newUser, email: event.target.value })
                  }
                  placeholder="user@example.com"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required={newUser.role !== "student"}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(event) =>
                    setNewUser({ ...newUser, password: event.target.value })
                  }
                  placeholder="Create password"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Create User Account
            </button>
          </form>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Default Seeded Accounts
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            These accounts are created automatically when the server starts:
          </p>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>
              <strong>Admin:</strong> ID: admin001 / Password: Admin@123 /
              Email: admin@yims.local
            </li>
            <li>
              <strong>Staff:</strong> ID: staff001 / Password: Staff@123 /
              Email: staff@yims.local
            </li>
            <li>
              <strong>Student:</strong> ID: STU-101 / Password: Student@123 /
              Email: student@yims.local
            </li>
          </ul>
          <p className="text-xs text-blue-700 mt-4">
            Note: Users can change their passwords using the "Forgot password?"
            link on the login page (admin/staff only). Students cannot reset
            passwords via email.
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-2">
            Excel Import/Export Instructions
          </h3>
          <p className="text-sm text-amber-800 mb-4">
            Manage user accounts in bulk using Excel:
          </p>
          <ul className="space-y-2 text-sm text-amber-900 list-disc list-inside">
            <li>
              <strong>Export:</strong> Downloads current users list to Excel file stored in server/data/excel/users.xlsx
            </li>
            <li>
              <strong>Import:</strong> Upload Excel with columns: role, identifier, email, password
            </li>
            <li>Password is required for new users, optional for updates</li>
            <li>Excel files are also saved in: server/data/excel/ folder</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Existing User Accounts
          </h2>
          <AdminDataManager
            entity="users-list"
            title=""
            columns={[
              { key: "role", label: "Role" },
              { key: "identifier", label: "ID/Username" },
              { key: "email", label: "Email" },
            ]}
            searchable
            readOnly
          />
        </section>
      </div>
    </div>
  );
}
