import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { sigUser } from "@org/app-vite-react/signals/sigUser";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = sigUser.value;
  const location = useLocation();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
