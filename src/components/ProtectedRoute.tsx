import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Role = "admin" | "staff" | "student";

type ProtectedRouteProps = {
  role: Role | Role[];
  children: ReactNode;
};

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("yimsUser") ?? "null") as
      | { role: Role; identifier: string }
      | null;
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const location = useLocation();
  const user = getUser();
  const allowedRoles = Array.isArray(role) ? role : [role];

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
