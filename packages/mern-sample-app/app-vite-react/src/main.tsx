import "@org/app-vite-react/lib/i18next/i18n";

import { Layout as layoutElement } from "@org/app-vite-react/app/layout";
import { providers } from "@org/app-vite-react/app/providers";
import { routes } from "@org/app-vite-react/app/routes";
import { MuiCssBaseline as cssBaseline } from "@org/app-vite-react/lib/@mui";
import { KeycloakRoute, type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { reactServer } from "@org/app-vite-react/server/server";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { useRouteError } from "react-router-dom";
import { type RouteObject } from "react-router-dom";

import "@org/app-vite-react/main.css";

function RootErrorPage() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>Click here to reload the app</button>
    </div>
  );
}

function ProtectedRoute({
  secure,
  Component,
}: {
  secure: (user: KeycloakUser | null) => boolean;
  Component: NonNullable<RouteObject["Component"]>;
}) {
  return <KeycloakRoute user={sigUser.value} secure={secure} Component={Component} />;
}

reactServer.run({
  rootId: "root",
  routes,
  providers,
  errorElement: RootErrorPage,
  layoutElement,
  cssBaseline,
  protectedRoute: ProtectedRoute,
});
