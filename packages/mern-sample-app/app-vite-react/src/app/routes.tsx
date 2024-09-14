import * as icons from "@mui/icons-material";
import type { NavigationRoute } from "@org/app-vite-react/route-typings";
import { HomePage } from "@org/app-vite-react/app/pages/Home";
import { Status404Page } from "@org/app-vite-react/app/pages/Status404";

export const routes: NavigationRoute[] = [
  {
    variant: "single",
    label: t => t("dashboard"),
    icon: <icons.Home />,
    path: "/",
    Component: HomePage,
    handle: {
      crumb: () => "Dashboard",
    },
  },
  {
    variant: "single",
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
        variant: "single",
        label: () => "Izlazni računi",
        path: "/invoice",
        icon: <icons.ReceiptTwoTone />,
        Component: () => <div>Izlazni računi</div>,
      },
      {
        variant: "single",
        label: () => "Ponude",
        path: "/offer",
        icon: <icons.LocalOffer />,
        Component: () => <div>Ponude</div>,
      },
      {
        variant: "single",
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
        variant: "single",
        label: () => "Profil",
        path: "/settings",
        icon: <icons.AccountCircleTwoTone />,
        Component: () => <div>Profil</div>,
        handle: {
          crumb: () => "Profil",
        },
      },
      {
        variant: "single",
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
  {
    variant: "single",
    label: () => "",
    Component: Status404Page,
    path: "*",
    hidden: true,
  },
];
