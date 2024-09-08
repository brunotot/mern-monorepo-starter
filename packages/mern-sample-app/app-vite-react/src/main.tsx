import "@org/app-vite-react/main.css";
import "@org/app-vite-react/lib/i18next/i18n";

import { reactServer } from "@org/app-vite-react/server";
import { routes } from "@org/app-vite-react/app/routes";

reactServer.run({
  routes,
});
