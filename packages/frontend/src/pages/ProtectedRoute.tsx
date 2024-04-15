import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { sigUser } from "../core";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = sigUser.value;
  const location = useLocation();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
