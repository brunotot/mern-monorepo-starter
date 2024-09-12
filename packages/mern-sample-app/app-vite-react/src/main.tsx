import { reactServer } from "@org/app-vite-react/server";
import { routes as ROUTES } from "@org/app-vite-react/app/routes";
import { RootErrorPage } from "@org/app-vite-react/app/pages/RootError";
import { Layout } from "@org/app-vite-react/app/layout";
import "@org/app-vite-react/main.css";

reactServer.run({
  routes: ROUTES,
  errorElement: <RootErrorPage />,
  layoutElement: Layout,
});
