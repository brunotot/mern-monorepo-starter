import React from "react";
import * as MuiIcons from "@mui/icons-material";
import { HomePage } from "../../../src/pages";
import { NavigationRoutes } from "../../../src/models";

const ROUTES: NavigationRoutes = [
  {
    label: t => t("dashboard"),
    icon: <MuiIcons.Home />,
    path: "/",
    Component: HomePage,
    handle: {
      crumb: () => "Dashboard",
    },
  },
  {
    label: () => "Klijenti",
    icon: <MuiIcons.SupportAgent />,
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
        icon: <MuiIcons.ReceiptTwoTone />,
        Component: () => <div>Izlazni računi</div>,
      },
      {
        label: () => "Ponude",
        path: "/offer",
        icon: <MuiIcons.LocalOffer />,
        Component: () => <div>Ponude</div>,
      },
      {
        label: () => "Otpremnice",
        path: "/dispatch",
        icon: <MuiIcons.SendTimeExtension />,
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
        icon: <MuiIcons.AccountCircleTwoTone />,
        Component: () => <div>Profil</div>,
        handle: {
          crumb: () => "Profil",
        },
      },
      {
        label: () => "Korisničko sučelje",
        path: "/ui",
        icon: <MuiIcons.GridView />,
        Component: () => <div>Korisničko sučelje</div>,
        handle: {
          crumb: () => "Korisničko sučelje",
        },
      },
    ],
  },
] satisfies NavigationRoutes;

// eslint-disable-next-line react-refresh/only-export-components
export default ROUTES;
