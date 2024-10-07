import type { NavigationRoute } from "@org/app-vite-react/route-typings";

import * as icons from "@mui/icons-material";
import { Protect } from "@org/app-vite-react/app/components/Protect";
import { HomePage } from "@org/app-vite-react/app/pages/Home";
import { Status404Page } from "@org/app-vite-react/app/pages/Status404";

import { IndexPage } from "./pages/Home/IndexPage";

export const routes: NavigationRoute[] = [
  {
    variant: "single",
    label: () => "Index",
    path: "/",
    Component: () => <IndexPage />,
    handle: {
      crumb: () => "Index",
    },
  },
  {
    label: () => "Admin settings",
    variant: "group",
    secure: user => !!user?.roles.some(r => ["admin"].includes(r)),
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
          <Protect roles={["admin"]}>
            <HomePage />
          </Protect>
        ),
      },
    ],
  },
  {
    variant: "single",
    label: () => "",
    Component: Status404Page,
    path: "*",
    hidden: true,
  },
];
