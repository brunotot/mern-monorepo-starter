import "@org/app-vite-react/lib/i18next/i18n";

import { Layout as layoutElement } from "@org/app-vite-react/app/layout";
import { providers } from "@org/app-vite-react/app/providers";
import { routes } from "@org/app-vite-react/app/routes";
import { MuiCssBaseline as cssBaseline } from "@org/app-vite-react/lib/@mui";
import { reactServer } from "@org/app-vite-react/server/server";
import { useRouteError } from "react-router-dom";

import "@org/app-vite-react/main.css";

// eslint-disable-next-line react-refresh/only-export-components
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

reactServer.run({
  rootId: "root",
  routes,
  providers,
  errorElement: RootErrorPage,
  layoutElement,
  cssBaseline,
});
