import type { NavigationRouteProtect } from "@org/app-vite-react/server/route-typings";

import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js/KeycloakUser";
import { Navigate, useLocation, type RouteObject } from "react-router-dom";

export function KeycloakRoute({
  secure,
  user,
  Component,
}: {
  secure: NavigationRouteProtect;
  user: KeycloakUser | null;
  Component: NonNullable<RouteObject["Component"]>;
}) {
  const location = useLocation();
  return secure(user) ? <Component /> : <Navigate to="/login" state={{ from: location }} replace />;
}
