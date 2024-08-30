import * as icons from "@mui/icons-material";

import type { NavigationRoutes } from "@org/app-vite-react/config/NavigationRoute.config";
import { HomePage } from "@org/app-vite-react/app/pages/Home";

export const routes: NavigationRoutes = [
  {
    label: t => t("dashboard"),
    icon: <icons.Home />,
    path: "/",
    Component: HomePage,
    handle: {
      crumb: () => "Dashboard",
    },
  },
  {
    label: () => "Klijenti",
    icon: <icons.SupportAgent />,
    path: "/clients",
    Component: HomePage,
  },
  {
    label: () => "Računi",
    variant: "group",
    children: [
      {
        label: () => "Izlazni računi",
        path: "/invoice",
        icon: <icons.ReceiptTwoTone />,
        Component: () => <div>Izlazni računi</div>,
      },
      {
        label: () => "Ponude",
        path: "/offer",
        icon: <icons.LocalOffer />,
        Component: () => <div>Ponude</div>,
      },
      {
        label: () => "Otpremnice",
        path: "/dispatch",
        icon: <icons.SendTimeExtension />,
        Component: () => <div>Otpremnice</div>,
      },
    ],
  },
  {
    label: () => "Postavke",
    variant: "group",
    handle: {
      crumb: () => "Postavke",
    },
    children: [
      {
        label: () => "Profil",
        path: "/settings",
        icon: <icons.AccountCircleTwoTone />,
        Component: () => <div>Profil</div>,
        handle: {
          crumb: () => "Profil",
        },
      },
      {
        label: () => "Korisničko sučelje",
        path: "/ui",
        icon: <icons.GridView />,
        Component: () => <div>Korisničko sučelje</div>,
        handle: {
          crumb: () => "Korisničko sučelje",
        },
      },
    ],
  },
] satisfies NavigationRoutes;
