import { type I18nTranslateFn } from "@org/app-vite-react/lib/i18next";
import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { type ReactNode } from "react";
import { type RouteObject } from "react-router-dom";

export type NavigationRouteUi = {
  icon?: ReactNode;
  label: (translate: I18nTranslateFn) => string;
};

// prettier-ignore
export type NavigationRouteItem = RouteObject & NavigationRouteUi & {
  variant: "single";
  path: string;
  secure?: (user: KeycloakUser | null) => boolean;
  hidden?: boolean;
  Component: NonNullable<RouteObject["Component"]>;
};

// prettier-ignore
export type NavigationRouteItems = NavigationRouteUi & {
  variant: "menu" | "group";
  children: NavigationRoute[];
  handle?: NonNullable<RouteObject["handle"]>;
};

export type NavigationRoute = NavigationRouteItem | NavigationRouteItems;
