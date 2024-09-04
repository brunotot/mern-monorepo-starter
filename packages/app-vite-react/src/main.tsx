import { reactServer } from "@org/app-vite-react/server";

import { routes } from "@org/app-vite-react/app/routes";
import "@org/app-vite-react/main.css";

reactServer.run({
  routes,
});
