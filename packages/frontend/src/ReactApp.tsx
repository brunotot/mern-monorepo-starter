import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { type Signal, signal } from "@preact/signals-react";
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { NavigationRoutes } from "@org/frontend/config/NavigationRoute.config";
import { MuiThemeConfig, MuiThemeValue, createTheme } from "@org/frontend/config/MuiTheme.config";

import { Layout } from "@org/frontend/components/layout/Layout";
import { Provider, Providers } from "@org/frontend/components/providers/Providers";
import { StylesProvider } from "@org/frontend/components/providers/impl/StylesProvider";
import { ThemeProvider } from "@org/frontend/components/providers/impl/MuiThemeProvider";
import { QueryClientProvider } from "@org/frontend/components/providers/impl/QueryClientProvider";

import { Status404Page } from "@org/frontend/app/pages/Status404";
import { RootErrorPage } from "@org/frontend/app/pages/RootError";

type ReactAppSignals = {
  theme: Signal<MuiThemeValue>;
};

type ReactAppConfig = {
  providers?: Provider[];
  errorElement?: ReactNode;
  routes: NavigationRoutes;
  theme: MuiThemeConfig;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
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
  static readonly #COMMON_PROVIDERS = [QueryClientProvider, StylesProvider, ThemeProvider];

  // prettier-ignore
  static readonly #COMMON_ROUTES: NavigationRoutes = [
      //{ label: () => "Configure Colors", Component: ThemeColorConfigurationPage, path: "/configure-colors", icon: <Home /> },
      { label: () => "",                 Component: Status404Page,               path: "*",                 hidden: true },
    ];

  signals!: ReactAppSignals;
  config!: ReactAppConfig;
  routes!: NavigationRoutes;
  providers!: Provider[];
  router!: ReturnType<typeof createBrowserRouter>;

  constructor() {
    // NOOP
  }

  run(config: ReactAppConfig) {
    this.#loadConfig(config);
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <RouterProvider router={this.router} />
      </React.StrictMode>,
    );
  }

  changeTheme(theme: DeepPartial<MuiThemeConfig>) {
    this.signals.theme.value = this.#loadTheme({
      config: { ...this.config.theme.config, ...theme.config },
      colors: { ...this.config.theme.colors, ...theme.colors },
    });
  }

  #loadTheme(theme: MuiThemeConfig) {
    return createTheme(theme);
  }

  #loadConfig(config: ReactAppConfig) {
    this.config = config;
    this.routes = [...config.routes, ...ReactApp.#COMMON_ROUTES];
    this.providers = [...(config.providers ?? []), ...ReactApp.#COMMON_PROVIDERS];
    this.router = this.#createBrowserRouter();
    this.signals = this.#buildSignals(config);
  }

  #buildSignals({ theme }: ReactAppConfig): ReactAppSignals {
    return {
      theme: signal(this.#loadTheme(theme)),
    };
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
