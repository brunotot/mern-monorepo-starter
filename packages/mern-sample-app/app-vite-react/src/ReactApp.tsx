import React, { type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { type RouteObject, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { type NavigationRoute } from "@org/app-vite-react/route-typings";
import { MuiStylesProvider, MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { KeycloakProvider, KeycloakRoute } from "@org/app-vite-react/lib/keycloak-js";
import { initI18n } from "@org/app-vite-react/lib/i18next";
import { sigUser } from "./signals/sigUser";

type Provider = React.FC<{ children: React.ReactNode }>;

// Function to nest children within a component
const nest = (children: React.ReactNode, Provider: React.FC<{ children: React.ReactNode }>) => (
  <Provider>{children}</Provider>
);

/** @hidden */
type ProvidersProps = React.PropsWithChildren<{
  list: Array<React.FC<{ children: React.ReactNode }>>;
}>;

// eslint-disable-next-line react-refresh/only-export-components
const Providers: React.FC<ProvidersProps> = ({ children, list }) => {
  return <>{list.reduceRight(nest, children)}</>;
};

type ReactAppConfig = {
  providers?: Provider[];
  layoutElement: Provider;
  errorElement: ReactNode;
  routes: NavigationRoute[];
};

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
  #domRoutes: RouteObject[] = [];

  constructor() {
    // NOOP
  }

  run(config: ReactAppConfig) {
    initI18n();
    this.#loadConfig(config);
    const rootDiv = document.getElementById("root")!;
    const domRoot = ReactDOM.createRoot(rootDiv);
    domRoot.render(<RouterProvider router={this.#createBrowserRouter()} />);
  }

  #loadConfig(config: ReactAppConfig) {
    this.config = config;
    this.routes = [...config.routes];
    this.#domRoutes = this.#convertNavigationToRoutes(this.routes);
    this.layoutElement = config.layoutElement;
    this.providers = [...ReactApp.#COMMON_PROVIDERS, ...(config.providers ?? [])];
  }

  #createBrowserRouter() {
    const Layout = this.layoutElement;
    return createBrowserRouter([
      {
        errorElement: this.config.errorElement,
        children: this.#domRoutes,
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

  #convertNavigationToRoutes(data: NavigationRoute[]): RouteObject[] {
    const routes: RouteObject[] = [];

    for (const item of data) {
      if (item.variant === "single") {
        const Component = item.Component;
        const secure = item.secure;

        if (secure) {
          // prettier-ignore
          const ProtectedComponent = () => <KeycloakRoute
            user={sigUser.value} 
            secure={secure} 
            Component={Component}
          />;

          item.Component = ProtectedComponent;
        }

        routes.push(item);
        continue;
      }

      // Register route for displaying breadcrumbs on menus and groups if `handle` is provided.
      if ("handle" in item && item.handle) {
        routes.push(item);
      }

      routes.push(...this.#convertNavigationToRoutes(item.children));
    }

    return routes;
  }
}
