import { Role } from "@org/shared";
import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { User, I18nTranslateFn } from "../../core";

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
  NavigationRouteChildren & {
    variant: "group" | "menu";
  };

export type NavigationRoute = NavigationRouteSingle | NavigationRouteMultiple;

export type NavigationRoutes = NavigationRoute[];
