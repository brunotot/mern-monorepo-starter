import { Role, User } from "@org/shared";
import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { type I18nTranslateFn } from "@org/frontend/config/i18n.config";

export type NavigationRouteAnchorSecure = Role[] | ((user: User) => boolean | Role[]);

export type NavigationRouteRender = {
  icon?: ReactNode;
  label: (translator: I18nTranslateFn) => string;
};

export type NavigationRouteAnchor = {
  path: string;
  secure?: NavigationRouteAnchorSecure;
  hidden?: boolean;
} & RouteObject;

export type NavigationRouteChildren = {
  children: NavigationRoute[];
};

export type NavigationRouteSingle = NavigationRouteRender &
  NavigationRouteAnchor & {
    variant?: "single";
  };

export type NavigationRouteMultiple = NavigationRouteRender &
  RouteObject &
  NavigationRouteChildren & {
    variant: "group" | "menu";
  };

export type NavigationRoutes = NavigationRoute[];

export type NavigationRoute = NavigationRouteSingle | NavigationRouteMultiple;

export function isAnyRouteActive(children: NavigationRoute[]): boolean {
  return children.some(child => {
    if ("children" in child) {
      return isAnyRouteActive(child.children as NavigationRoute[]);
    }
    return location.pathname === child.path;
  });
}
