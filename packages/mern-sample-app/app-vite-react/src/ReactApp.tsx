import React, { type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { type RouteObject, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { type NavigationRoute } from "@org/app-vite-react/route-typings";
import { MuiStylesProvider, MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { KeycloakProvider } from "@org/app-vite-react/lib/keycloak-js";
import { initI18n } from "@org/app-vite-react/lib/i18next";

type Provider = React.FC<{ children: React.ReactNode }>;

// Function to nest children within a component
const nest = (children: React.ReactNode, Provider: React.FC<{ children: React.ReactNode }>) => (
  <Provider>{children}</Provider>
);

/** @hidden */
type ProvidersProps = React.PropsWithChildren<{
  list: Array<React.FC<{ children: React.ReactNode }>>;
}>;

// Providers component definition
const Providers: React.FC<ProvidersProps> = ({ children, list }) => {
  return <>{list.reduceRight(nest, children)}</>;
};

type ReactAppConfig = {
  providers?: Provider[];
  layoutElement: Provider;
  errorElement: ReactNode;
  routes: NavigationRoute[];
};

function convertToRoutes(data: NavigationRoute[]): RouteObject[] {
  const routes: RouteObject[] = [];

  for (const item of data) {
    if ("path" in item || "handle" in item) {
      routes.push(item);
      continue;
    }
    routes.push(...convertToRoutes(item.children));
  }

  return routes;
}

export class ReactApp {
  static readonly #COMMON_PROVIDERS = [
    KeycloakProvider,
    QueryClientProvider,
    MuiStylesProvider,
    MuiThemeProvider,
  ];

  config!: ReactAppConfig;
  routes!: NavigationRoute[];
  layoutElement!: Provider;
  providers!: Provider[];
  router!: ReturnType<typeof createBrowserRouter>;

  constructor() {
    initI18n();
  }

  run(config: ReactAppConfig) {
    this.#loadConfig(config);
    /*ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <RouterProvider router={this.router} />
      </React.StrictMode>,
    );*/
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <RouterProvider router={this.router} />,
    );
  }

  #loadConfig(config: ReactAppConfig) {
    this.config = config;
    this.routes = [...config.routes];
    this.layoutElement = config.layoutElement;
    this.providers = [...(config.providers ?? []), ...ReactApp.#COMMON_PROVIDERS];
    this.router = this.#createBrowserRouter();
  }

  #createBrowserRouter() {
    const Layout = this.layoutElement;
    return createBrowserRouter([
      {
        errorElement: this.config.errorElement,
        children: convertToRoutes(this.routes),
        element: (
          <Providers list={this.providers}>
            <CssBaseline />
            <Layout>
              <Outlet />
            </Layout>
          </Providers>
        ),
      },
    ]);
  }
}
