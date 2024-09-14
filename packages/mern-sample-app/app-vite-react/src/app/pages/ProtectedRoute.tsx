import { type RouteObject } from "react-router-dom";
import { KeycloakRoute, type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { sigUser } from "@org/app-vite-react/signals/sigUser";

export function ProtectedRoute({
  secure,
  Component,
}: {
  secure: (user: KeycloakUser | null) => boolean;
  Component: NonNullable<RouteObject["Component"]>;
}) {
  return <KeycloakRoute user={sigUser.value} secure={secure} Component={Component} />;
}
