import { RouteObject } from "react-router-dom";
import { NavigationRoute, NavigationRoutes } from "../models";

export function isAnyRouteActive(children: NavigationRoute[]): boolean {
  return children.some(child => {
    if ("children" in child) {
      return isAnyRouteActive(child.children as NavigationRoute[]);
    }
    return location.pathname === child.path;
  });
}

export function convertToRoutes(data: NavigationRoutes): RouteObject[] {
  const routes: RouteObject[] = [];

  for (const item of data) {
    if ("path" in item) {
      routes.push(item);
      continue;
    }
    routes.push(...convertToRoutes(item.children));
  }

  return routes;
}
