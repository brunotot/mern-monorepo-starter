import * as MuiIcons from "@mui/icons-material";
import { HomePage, LoginPage, Status404Page } from "./pages";
import { NavigationRoutes } from "./models";
import { convertToRoutes } from "./utils/NavigationRouteUtils";
import PreferencesPage from "./pages/Preferences/PreferencesPage";

/*
import { Suspense, lazy } from "react";

const PublicRoute = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const PreferencesPage = PublicRoute(
  lazy(() => import("./pages/Preferences/PreferencesPage"))
);*/

export const VAR_NAVIGATION_ROUTES: NavigationRoutes = [
  {
    label: t => t("dashboard"),
    icon: <MuiIcons.Home />,
    path: "/",
    Component: HomePage,
  },
  {
    label: t => t("accountSettings"),
    icon: <MuiIcons.ManageAccounts />,
    path: "/account",
    Component: PreferencesPage,
  },
  {
    label: t => t("apps"),
    icon: <MuiIcons.Apps />,
    variant: "group",
    children: [
      {
        label: t => t("calendar"),
        path: "/calendar",
        Component: () => <div>Calendar</div>,
      },
      {
        label: t => t("invoice"),
        path: "/invoice",
        Component: () => <div>Invoice</div>,
      },
      {
        label: t => t("user"),
        variant: "menu",
        children: [
          {
            label: t => t("list"),
            path: "/user/list",
            Component: () => <div>User list</div>,
          },
          {
            label: t => t("view"),
            path: "/user/view",
            Component: () => <div>User view</div>,
          },
        ],
      },
      {
        label: t => t("rolesAndPermissions"),
        path: "/roles",
        Component: () => <div>Roles and permissions</div>,
      },
    ],
  },
  {
    label: t => t("pages"),
    variant: "group",
    children: [
      {
        label: t => t("login"),
        icon: <MuiIcons.Login />,
        path: "/login",
        Component: LoginPage,
      },
      {
        label: t => t("register"),
        icon: <MuiIcons.PersonAdd />,
        path: "/register",
        Component: () => <div>Register</div>,
      },
      {
        label: t => t("error"),
        icon: <MuiIcons.Info />,
        path: "/error",
        Component: () => <div>Error</div>,
      },
    ],
  },
  {
    label: t => t("userInterface"),
    variant: "group",
    children: [
      {
        label: t => t("typography"),
        icon: <MuiIcons.TextIncrease />,
        path: "/typography",
        Component: () => <div>Typography</div>,
      },
      {
        label: t => t("icons"),
        icon: <MuiIcons.Mood />,
        path: "/icons",
        Component: () => <div>Icons</div>,
      },
      {
        label: t => t("cards"),
        icon: <MuiIcons.SpaceDashboard />,
        path: "/cards",
        Component: () => <div>Cards</div>,
      },
      {
        label: t => t("tables"),
        icon: <MuiIcons.TableView />,
        path: "/tables",
        Component: () => <div>Tables</div>,
      },
      {
        label: t => t("forms"),
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
