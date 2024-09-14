import { initI18n } from "@org/app-vite-react/lib/i18next";
import { reactServer } from "@org/app-vite-react/server";
import { routes } from "@org/app-vite-react/app/routes";
import { providers } from "@org/app-vite-react/app/providers";
import { RootErrorPage as errorElement } from "@org/app-vite-react/app/pages/RootError";
import { Layout as layoutElement } from "@org/app-vite-react/app/layout";
import { MuiCssBaseline as cssBaseline } from "@org/app-vite-react/lib/@mui";
import { ProtectedRoute as protectedRoute } from "@org/app-vite-react/app/pages/ProtectedRoute";

import "@org/app-vite-react/main.css";

initI18n();

reactServer.run({
  routes,
  providers,
  errorElement,
  layoutElement,
  cssBaseline,
  protectedRoute,
});
