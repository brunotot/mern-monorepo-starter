import type {
  NavigationRouteProtect,
  NavigationRoute,
  NavigationRouteItem,
} from "@org/app-vite-react/server/route-typings";

import { sigDirection } from "@org/app-vite-react/app/signals/sigDirection";
import React from "react";
import ReactDOM from "react-dom/client";
import * as RouterDOM from "react-router-dom";

import { BoundarySuspenseGroup } from "../app/components/BoundarySuspenseGroup";

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
};

function getProtectFns(
  oldProtectFns: NavigationRouteProtect[],
  newProtectFn?: NavigationRouteProtect,
) {
  const protectFns = [...oldProtectFns];
  if (newProtectFn) {
    protectFns.push(newProtectFn);
  }
  return protectFns;
}

export class ReactApp {
  routes!: NavigationRoute[];

  layoutElement!: Provider;
  providers!: Provider[];

  errorElement!: React.FC;

  cssBaseline!: React.FC;
  rootId?: string;
  #domRoutes!: RouterDOM.RouteObject[];

  constructor() {
    // NOOP
  }

  run(config: ReactAppConfig) {
    this.#loadConfig(config);
    const rootDiv = document.getElementById(this.rootId ?? "root")!;
    const domRoot = ReactDOM.createRoot(rootDiv);
    domRoot.render(<RouterDOM.RouterProvider router={this.#createBrowserRouter()} />);
    sigDirection.subscribe(dir => (document.documentElement.dir = dir));
  }

  #loadConfig(config: ReactAppConfig) {
    this.routes = [...config.routes];
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

  #convertNavigationToRoutes(
    data: NavigationRoute[],
    nestedProtectFns: NavigationRouteProtect[] = [],
  ): RouterDOM.RouteObject[] {
    const routes: RouterDOM.RouteObject[] = [];

    const wrapComponentInBoundarySuspenseGroup = (
      item: NavigationRouteItem,
      protectFns: NavigationRouteProtect[],
    ) => {
      const Component = item.Component;
      item.Component = () => (
        <BoundarySuspenseGroup protect={protectFns}>
          <Component />
        </BoundarySuspenseGroup>
      );
    };

    for (const item of data) {
      if (item.variant === "single") {
        wrapComponentInBoundarySuspenseGroup(item, getProtectFns(nestedProtectFns, item.secure));
        routes.push(item as RouterDOM.RouteObject);
        continue;
      }

      const localItem = { ...item };

      localItem.children = this.#convertNavigationToRoutes(
        item.children,
        getProtectFns(nestedProtectFns, item.secure),
      ) as NavigationRoute[];

      routes.push(localItem as RouterDOM.RouteObject);
    }

    return routes;
  }
}
