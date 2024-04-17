import {
  ClassMetadataEntry,
  ClassMetadataInjectType,
} from "@tsvdec/decorators";
import { NextFunction, Request, Response } from "express";
import { SwaggerPath } from "../config";

export type RouteMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RouteHandler = (
  req: Request,
  res: Response
) => Promise<void | Response>;

export type RouteMiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RequestMappingProps = {
  name: string;
  method: RouteMethod;
  path: string;
  middlewares: Array<RouteMiddleware>;
};

export type RequestRoute = RequestMappingProps & {
  handler: RouteHandler;
  swagger?: SwaggerPath;
};

export type RoutesMetaItem = {
  basePath: string;
  routes: RequestRoute[];
};

export class RoutesMetaService extends ClassMetadataEntry<RoutesMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new RoutesMetaService(injection);
  }

  constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      basePath: "",
      routes: [],
    }));
  }

  getRoute(routeName: string) {
    return this.value.routes.find((r) => r.name === routeName);
  }

  updateRoute(
    routeName: string,
    newState: (route: RequestRoute) => RequestRoute
  ) {
    const index = this.value.routes.findIndex((r) => r.name === routeName);
    if (index === -1) return;
    this.value.routes[index] = newState(this.value.routes[index]);
  }

  setBasePath(basePath: string) {
    this.value.basePath = basePath;
  }

  addRoute(route: RequestRoute) {
    this.value.routes.push(route);
  }
}
