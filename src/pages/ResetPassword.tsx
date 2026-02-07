import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type Role = "admin" | "staff";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<Role>(
    (searchParams.get("role") as Role) || "admin"
  );
  const [step, setStep] = useState<"email" | "code">("email");

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Failed to send reset code");
      }

      setMessage("Reset code sent to your email. Check your inbox.");
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Failed to reset password");
      }

      setMessage("Password updated successfully!");
      setTimeout(() => {
        navigate(`/login?role=${role}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-500 mt-2">
            {step === "email"
              ? "Enter your registered email to receive a reset code."
              : "Enter the code from your email and create a new password."}
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 px-4 py-2 rounded-full border text-sm font-semibold transition ${
                role === "admin"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole("staff")}
              className={`flex-1 px-4 py-2 rounded-full border text-sm font-semibold transition ${
                role === "staff"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Staff
            </button>
          </div>

          {message && (
            <div className="bg-blue-50 text-blue-700 border border-blue-200 p-4 rounded-xl">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
              {error}
            </div>
          )}

          {step === "email" && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Reset Code
                </label>
                <input
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Enter 6-digit code"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Create new password"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Back to email entry
              </button>
            </form>
          )}
        </div>

        <div className="text-center">
          <Link
            to={`/login?role=${role}`}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
