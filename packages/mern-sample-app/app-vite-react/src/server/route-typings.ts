import { type I18nTranslateFn } from "@org/app-vite-react/lib/i18next";
import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { type ReactNode } from "react";
import { type RouteObject as RouteObjectDom } from "react-router-dom";

type RouteObject = Omit<RouteObjectDom, "handle">;

export type NavigationRouteProtect = (user: KeycloakUser | null) => boolean;

export type NavigationRouteProtectParam = NavigationRouteProtect | NavigationRouteProtect[];

type NavigationRouteUiHidden = {
  hidden: true;
};

type NavigationRouteUiVisible = {
  hidden?: false;
  label: (translate: I18nTranslateFn) => string;
  icon?: ReactNode;
};

export type NavigationRouteHandle =
  | {
      disableLink?: boolean;
      crumb?: (translateFn: I18nTranslateFn, params: Record<string, string | undefined>) => string;
    }
  | undefined;

export type NavigationRouteUi = {
  path: string;
  secure?: NavigationRouteProtect;
  handle?: NavigationRouteHandle;
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
};

export type NavigationRoute = NavigationRouteItem | NavigationRouteItems;
