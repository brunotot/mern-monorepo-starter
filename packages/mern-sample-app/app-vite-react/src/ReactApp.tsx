import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { type NavigationRouteItem, type NavigationRoute } from "@org/app-vite-react/route-typings";
import React from "react";
import ReactDOM from "react-dom/client";
import * as RouterDOM from "react-router-dom";

export type Provider = React.FC<{ children: React.ReactNode }>;

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
  errorElement: React.FC;
  routes: NavigationRoute[];
  cssBaseline: React.FC;
  rootId?: string;
  protectedRoute: React.FC<{
    secure: (user: KeycloakUser | null) => boolean;
    Component: NonNullable<RouterDOM.RouteObject["Component"]>;
  }>;
};

export class ReactApp {
  routes!: NavigationRoute[];
  layoutElement!: Provider;
  providers!: Provider[];
  errorElement!: React.FC;
  cssBaseline!: React.FC;
  rootId?: string;
  #domRoutes!: RouterDOM.RouteObject[];
  #protectedRoute!: React.FC<{
    secure: (user: KeycloakUser | null) => boolean;
    Component: NonNullable<RouterDOM.RouteObject["Component"]>;
  }>;

  constructor() {
    // NOOP
  }

  run(config: ReactAppConfig) {
    this.#loadConfig(config);
    const rootDiv = document.getElementById(this.rootId ?? "root")!;
    const domRoot = ReactDOM.createRoot(rootDiv);
    domRoot.render(<RouterDOM.RouterProvider router={this.#createBrowserRouter()} />);
  }

  #loadConfig(config: ReactAppConfig) {
    this.routes = [...config.routes];
    this.#protectedRoute = config.protectedRoute;
    this.cssBaseline = config.cssBaseline;
    this.rootId = config.rootId;
    this.errorElement = config.errorElement;
    this.#domRoutes = this.#convertNavigationToRoutes(this.routes);
    this.layoutElement = config.layoutElement;
    this.providers = [...(config.providers ?? [])];
  }

  #createBrowserRouter() {
    const Layout = this.layoutElement;
    const CssBaseline = this.cssBaseline;
    const ErrorElement = this.errorElement;

    return RouterDOM.createBrowserRouter([
      {
        errorElement: <ErrorElement />,
        children: this.#domRoutes,
        element: (
          <Providers list={this.providers}>
            <CssBaseline />
            <Layout>
              <RouterDOM.Outlet />
            </Layout>
          </Providers>
        ),
      },
    ]);
  }

  #convertNavigationToRoutes(data: NavigationRoute[]): RouterDOM.RouteObject[] {
    const routes: RouterDOM.RouteObject[] = [];

    const protectComponentIfNeeded = (item: NavigationRouteItem) => {
      const Component = item.Component;
      const secure = item.secure;
      if (!secure) return;

      const ProtectedRoute = this.#protectedRoute;

      // prettier-ignore
      const ProtectedComponent = () => <ProtectedRoute
        secure={secure} 
        Component={Component}
      />;

      item.Component = ProtectedComponent;
    };

    for (const item of data) {
      if (item.variant === "single") {
        protectComponentIfNeeded(item);
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
