import type { NavigationRoute } from "@org/app-vite-react/server/route-typings";
import type { TODO } from "@org/lib-commons";

//import * as icons from "@mui/icons-material";
import { Protect } from "@org/app-vite-react/app/components/Protect";
import ManageUsersPage from "@org/app-vite-react/app/pages/admin-settings/manage-users";
import HomePage from "@org/app-vite-react/app/pages/home";
import VisualPreferencesPage from "@org/app-vite-react/app/pages/visual-preferences";

import CreateUserPage from "./pages/admin-settings/manage-users/pages/create-user";
import EditUserPage from "./pages/admin-settings/manage-users/pages/edit-user";

export const routes: NavigationRoute[] = [
  {
    variant: "single",
    label: () => "Home",
    //icon: <icons.Dashboard fontSize="inherit" />,
    path: "/",
    Component: () => <HomePage />,
    handle: {
      crumb: () => "Home",
    },
  },
  {
    variant: "single",
    label: () => "Visual preferences",
    //icon: <icons.Palette fontSize="inherit" />,
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
    secure: user => {
      return !!user?.roles.some(r => ["avr-admin"].includes(r));
    },
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
            label: () => "Manage users",
            path: "",
            Component: () => (
              <Protect roles={["avr-admin"]}>
                <ManageUsersPage />
              </Protect>
            ),
          },
          {
            variant: "single",
            hidden: true,
            path: "add",
            handle: {
              crumb: () => "Create user",
            },
            Component: () => (
              <Protect roles={["avr-admin"]}>
                <CreateUserPage />
              </Protect>
            ),
          },
          {
            variant: "single",
            hidden: true,
            path: ":username/edit",
            handle: {
              crumb: ({ username }: TODO) => "Edit user " + username,
            },
            Component: () => (
              <Protect roles={["avr-admin"]}>
                <EditUserPage />
              </Protect>
            ),
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
