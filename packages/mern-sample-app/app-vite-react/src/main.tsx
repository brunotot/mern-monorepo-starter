import "@org/app-vite-react/lib/i18next/i18n";

import { Layout as layoutElement } from "@org/app-vite-react/app/layout";
import { ProtectedRoute as protectedRoute } from "@org/app-vite-react/app/pages/ProtectedRoute";
import { RootErrorPage as errorElement } from "@org/app-vite-react/app/pages/RootError";
import { providers } from "@org/app-vite-react/app/providers";
import { routes } from "@org/app-vite-react/app/routes";
import { MuiCssBaseline as cssBaseline } from "@org/app-vite-react/lib/@mui";
import { reactServer } from "@org/app-vite-react/server";

import "@org/app-vite-react/main.css";

reactServer.run({
  rootId: "root",
  routes,
  providers,
  errorElement,
  layoutElement,
  cssBaseline,
  protectedRoute,
});
