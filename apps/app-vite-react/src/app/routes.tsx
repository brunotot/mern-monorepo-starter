import type { NavigationRoute } from "@/server/route-typings";

import ManageUsersPage from "@/app/pages/admin-settings/manage-users";
import HomePage from "@/app/pages/home";
import VisualPreferencesPage from "@/app/pages/visual-preferences";

import CreateUserPage from "./pages/admin-settings/manage-users/pages/create-user";
import EditUserPage from "./pages/admin-settings/manage-users/pages/edit-user";

export const routes: NavigationRoute[] = [
  {
    variant: "single",
    label: t => t("dashboard"),
    path: "/",
    Component: HomePage,
    handle: {
      crumb: t => t("dashboard"),
    },
  },
  {
    variant: "single",
    label: () => "Visual preferences",
    path: "visual-preferences",
    Component: VisualPreferencesPage,
    handle: {
      crumb: () => "Visual preferences",
    },
  },
  {
    label: () => "Admin settings",
    variant: "group",
    path: "admin",
    secure: user => !!user?.roles.some(r => ["avr-admin"].includes(r)),
    handle: {
      crumb: () => "Admin settings",
      disableLink: true,
    },
    children: [
      {
        variant: "menu",
        path: "users",
        hidden: true,
        handle: {
          crumb: () => "Manage users",
        },
        children: [
          {
            variant: "single",
            Component: ManageUsersPage,
            label: () => "Manage users",
            path: "",
          },
          {
            variant: "single",
            Component: CreateUserPage,
            hidden: true,
            path: "add",
            handle: {
              crumb: () => "Create user",
            },
          },
          {
            variant: "single",
            Component: EditUserPage,
            hidden: true,
            path: ":username/edit",
            handle: {
              crumb: (_, params) => "Edit user " + params?.username,
            },
          },
        ],
      },
    ],
  },
  {
    variant: "single",
    Component: () => <div>Not found</div>,
    path: "*",
    hidden: true,
  },
];
