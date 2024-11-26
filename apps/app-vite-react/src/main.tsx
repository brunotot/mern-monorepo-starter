import "@/lib/i18next/i18n";

import { useRouteError } from "react-router-dom";
import { Layout as layoutElement } from "@/app/layout";
import { providers } from "@/app/providers";
import { routes } from "@/app/routes";
import { MuiCssBaseline as cssBaseline } from "@/lib/@mui";
import { reactServer } from "@/server/server";

import "@/main.css";

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
