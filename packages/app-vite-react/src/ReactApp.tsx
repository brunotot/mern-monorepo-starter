import type { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import type { RouteObject } from "react-router-dom";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import type { NavigationRoutes } from "@org/app-vite-react/config/NavigationRoute.config";

import { Layout } from "@org/app-vite-react/components/layout/Layout";
import type { Provider } from "@org/app-vite-react/components/providers/Providers";
import { Providers } from "@org/app-vite-react/components/providers/Providers";
import { StylesProvider } from "@org/app-vite-react/components/providers/impl/StylesProvider";
import { ThemeProvider } from "@org/app-vite-react/components/providers/impl/MuiThemeProvider";
import { QueryClientProvider } from "@org/app-vite-react/components/providers/impl/QueryClientProvider";

import { Status404Page } from "@org/app-vite-react/app/pages/Status404";
import { RootErrorPage } from "@org/app-vite-react/app/pages/RootError";
import { KeycloakAuthProvider } from "./components/providers";

type ReactAppConfig = {
  providers?: Provider[];
  errorElement?: ReactNode;
  routes: NavigationRoutes;
};

function convertToRoutes(data: NavigationRoutes): RouteObject[] {
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
  static readonly #DEFAULT_ROOT_ERROR_PAGE = (<RootErrorPage />);
  static readonly #COMMON_PROVIDERS = [
    KeycloakAuthProvider,
    QueryClientProvider,
    StylesProvider,
    ThemeProvider,
  ];

  // prettier-ignore
  static readonly #COMMON_ROUTES: NavigationRoutes = [
      //{ label: () => "Configure Colors", Component: ThemeColorConfigurationPage, path: "/configure-colors", icon: <Home /> },
      { label: () => "",                 Component: Status404Page,               path: "*",                 hidden: true },
    ];

  config!: ReactAppConfig;
  routes!: NavigationRoutes;
  providers!: Provider[];
  router!: ReturnType<typeof createBrowserRouter>;

  constructor() {
    // NOOP
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
    this.routes = [...config.routes, ...ReactApp.#COMMON_ROUTES];
    this.providers = [...(config.providers ?? []), ...ReactApp.#COMMON_PROVIDERS];
    this.router = this.#createBrowserRouter();
  }

  #createBrowserRouter() {
    return createBrowserRouter([
      {
        errorElement: this.config.errorElement ?? ReactApp.#DEFAULT_ROOT_ERROR_PAGE,
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
