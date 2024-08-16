import "./config";
import "./main.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider, Providers } from "../../src/core/components/providers/Providers";
import {
  Layout,
  StylesProvider,
  ThemeProvider,
  QueryClientProvider,
  MuiThemeConfig,
  createTheme,
  MuiThemeValue,
} from ".";
import { RootErrorPage, Status404Page } from "../pages";
import { NavigationRoutes } from "../models";
import { convertToRoutes } from "../utils";
//import { ThemeColorConfigurationPage } from "./pages/ThemeColorConfigurationPage/ThemeColorConfigurationPage";
//import { Home } from "@mui/icons-material";

import { type Signal, signal } from "@preact/signals-react";

export type ReactAppSignals = {
  theme: Signal<MuiThemeValue>;
};

export type ReactAppConfig = {
  providers?: Provider[];
  errorElement?: ReactNode;
  routes: NavigationRoutes;
  theme: MuiThemeConfig;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export class ReactApp {
  static #instance: ReactApp;

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

  public static getInstance() {
    ReactApp.#instance ??= new ReactApp();
    return ReactApp.#instance;
  }

  private constructor() {
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
