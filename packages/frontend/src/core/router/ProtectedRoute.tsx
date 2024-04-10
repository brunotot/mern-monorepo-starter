import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuthContext();
  const location = useLocation();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
