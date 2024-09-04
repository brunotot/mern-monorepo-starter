import "@org/app-vite-react/setup/i18n.setup";
import "@org/app-vite-react/main.css";
import { reactServer } from "@org/app-vite-react/server";
import { routes } from "@org/app-vite-react/app/routes";

reactServer.run({
  routes,
});
