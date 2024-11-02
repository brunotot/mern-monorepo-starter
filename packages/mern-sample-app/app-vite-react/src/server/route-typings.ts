import { type I18nTranslateFn } from "@org/app-vite-react/lib/i18next";
import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { type ReactNode } from "react";
import { type RouteObject } from "react-router-dom";

type NavigationRouteUiHidden = {
  hidden: true;
};

type NavigationRouteUiVisible = {
  hidden?: false;
  label: (translate: I18nTranslateFn) => string;
  icon?: ReactNode;
};

export type NavigationRouteUi = {
  path: string;
  secure?: (user: KeycloakUser | null) => boolean;
} & (NavigationRouteUiVisible | NavigationRouteUiHidden);

// prettier-ignore
export type NavigationRouteItem = RouteObject & NavigationRouteUi & {
  variant: "single";
  Component: NonNullable<RouteObject["Component"]>;
};

// prettier-ignore
export type NavigationRouteItems = NavigationRouteUi & {
  variant: "menu" | "group";
  children: NavigationRoute[];
  handle?: NonNullable<RouteObject["handle"]>;
};

export type NavigationRoute = NavigationRouteItem | NavigationRouteItems;
