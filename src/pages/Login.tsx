import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type Role = "admin" | "staff" | "student";

const roleLabels: Record<Role, string> = {
  admin: "Admin",
  staff: "Staff",
  student: "Student",
};

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<Role>(
    (searchParams.get("role") as Role) || "admin"
  );
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const identifierLabel = useMemo(() => {
    if (role === "student") return "Student ID Card Number";
    if (role === "staff") return "Staff ID";
    return "Admin ID";
  }, [role]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, identifier, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Login failed");
      }

      const user = await response.json();
      localStorage.setItem("yimsUser", JSON.stringify(user));

      if (role === "admin") navigate("/admin");
      if (role === "staff") navigate("/staff");
      if (role === "student") navigate("/student");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
            <p className="text-sm text-gray-500">
              Sign in with your assigned ID and password.
            </p>
          </div>

          <Link
            to="/"
            className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm"
          >
            Home
          </Link>
        </header>

        <section className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-3">
            {(["admin", "staff", "student"] as Role[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`px-5 py-2 rounded-full border text-sm font-semibold transition ${
                  role === value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {roleLabels[value]} Login
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                {identifierLabel}
              </label>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder={`Enter ${identifierLabel}`}
                className="border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              {(role === "admin" || role === "staff") && (
                <Link
                  to={`/reset-password?role=${role}`}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
