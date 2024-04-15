import * as MuiIcons from "@mui/icons-material";
import { Role } from "@org/shared";
import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { I18nTranslateFn } from "./core/config";
import { User } from "./core/signals";
import { HomePage, LoginPage, Status404Page } from "./pages";

export type NavigationRouteAnchorSecure =
  | Role[]
  | ((user: User) => boolean | Role[]);

export type NavigationRouteRender = {
  icon?: ReactNode;
  label: (translator: I18nTranslateFn) => string;
};

export type NavigationRouteAnchor = {
  path: string;
  secure?: NavigationRouteAnchorSecure;
  hidden?: boolean;
} & RouteObject;

export type NavigationRouteChildren = {
  children: NavigationRoute[];
};

export type NavigationRouteSingle = NavigationRouteRender &
  NavigationRouteAnchor & {
    variant?: "single";
  };

export type NavigationRouteMultiple = NavigationRouteRender &
  NavigationRouteChildren & {
    variant: "group" | "menu";
  };

export type NavigationRoute = NavigationRouteSingle | NavigationRouteMultiple;

export type NavigationRoutes = NavigationRoute[];

export function isAnyRouteActive(children: NavigationRoute[]): boolean {
  return children.some((child) => {
    if ("children" in child) {
      return isAnyRouteActive(child.children as NavigationRoute[]);
    }
    return location.pathname === child.path;
  });
}

function convertToRoutes(data: NavigationRoutes): RouteObject[] {
  const routes: RouteObject[] = [];

  for (const item of data) {
    if ("path" in item) {
      routes.push(item);
      continue;
    }
    routes.push(...convertToRoutes(item.children));
  }

  return routes;
}

export const VAR_NAVIGATION_ROUTES: NavigationRoutes = [
  {
    label: (t) => t("dashboard"),
    icon: <MuiIcons.Home />,
    path: "/",
    Component: HomePage,
  },
  {
    label: (t) => t("accountSettings"),
    icon: <MuiIcons.ManageAccounts />,
    path: "/account",
    Component: () => <div>Account settings</div>,
  },
  {
    label: (t) => t("apps"),
    icon: <MuiIcons.Apps />,
    variant: "group",
    children: [
      {
        label: (t) => t("calendar"),
        path: "/calendar",
        Component: () => <div>Calendar</div>,
      },
      {
        label: (t) => t("invoice"),
        path: "/invoice",
        Component: () => <div>Invoice</div>,
      },
      {
        label: (t) => t("user"),
        variant: "menu",
        children: [
          {
            label: (t) => t("list"),
            path: "/user/list",
            Component: () => <div>User list</div>,
          },
          {
            label: (t) => t("view"),
            path: "/user/view",
            Component: () => <div>User view</div>,
          },
        ],
      },
      {
        label: (t) => t("rolesAndPermissions"),
        path: "/roles",
        Component: () => <div>Roles and permissions</div>,
      },
    ],
  },
  {
    label: (t) => t("pages"),
    variant: "group",
    children: [
      {
        label: (t) => t("login"),
        icon: <MuiIcons.Login />,
        path: "/login",
        Component: LoginPage,
      },
      {
        label: (t) => t("register"),
        icon: <MuiIcons.PersonAdd />,
        path: "/register",
        Component: () => <div>Register</div>,
      },
      {
        label: (t) => t("error"),
        icon: <MuiIcons.Info />,
        path: "/error",
        Component: () => <div>Error</div>,
      },
    ],
  },
  {
    label: (t) => t("userInterface"),
    variant: "group",
    children: [
      {
        label: (t) => t("typography"),
        icon: <MuiIcons.TextIncrease />,
        path: "/typography",
        Component: () => <div>Typography</div>,
      },
      {
        label: (t) => t("icons"),
        icon: <MuiIcons.Mood />,
        path: "/icons",
        Component: () => <div>Icons</div>,
      },
      {
        label: (t) => t("cards"),
        icon: <MuiIcons.SpaceDashboard />,
        path: "/cards",
        Component: () => <div>Cards</div>,
      },
      {
        label: (t) => t("tables"),
        icon: <MuiIcons.TableView />,
        path: "/tables",
        Component: () => <div>Tables</div>,
      },
      {
        label: (t) => t("forms"),
        icon: <MuiIcons.ListAlt />,
        path: "/forms",
        Component: () => <div>Forms</div>,
      },
    ],
  },
  {
    path: "*",
    hidden: true,
    Component: Status404Page,
    label: () => "",
  },
];

export const routes = convertToRoutes(VAR_NAVIGATION_ROUTES);
