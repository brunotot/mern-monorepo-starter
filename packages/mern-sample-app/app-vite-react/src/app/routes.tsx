import type { NavigationRoute } from "@org/app-vite-react/route-typings";

import * as icons from "@mui/icons-material";
import { Protect } from "@org/app-vite-react/app/components/Protect";
import ManageUsersPage from "@org/app-vite-react/app/pages/admin-settings/manage-users";
import HomePage from "@org/app-vite-react/app/pages/home";

export const routes: NavigationRoute[] = [
  {
    variant: "single",
    label: () => "Home",
    path: "/",
    Component: () => <HomePage />,
    handle: {
      crumb: () => "Home",
    },
  },
  {
    label: () => "Admin settings",
    variant: "group",
    secure: user => {
      return !!user?.roles.some(r => ["avr-admin"].includes(r));
    },
    handle: {
      crumb: () => "Admin settings",
    },
    children: [
      {
        variant: "single",
        label: () => "Manage users",
        icon: <icons.ManageAccounts fontSize="inherit" />,
        path: "/admin/users",
        handle: {
          crumb: () => "Manage users",
        },
        Component: () => (
          <Protect roles={["avr-admin"]}>
            <ManageUsersPage />
          </Protect>
        ),
      },
    ],
  },
  {
    variant: "single",
    label: () => "",
    Component: () => <div>Not found</div>,
    path: "*",
    hidden: true,
  },
];
