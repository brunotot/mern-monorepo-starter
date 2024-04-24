import { type ClassMetadataInjectType, ClassMetadataEntry } from "@tsvdec/decorators";
import type { NextFunction, Request, Response } from "express";

// @backend
import type { SwaggerPath } from "@config";

export type RouteMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

export type RouteMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type RouteHandler = (req: Request, res: Response) => Promise<void | Response>;

export type RouteMiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;

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

export class RouteDecoratorManager extends ClassMetadataEntry<RoutesMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new RouteDecoratorManager(injection);
  }

  constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      basePath: "",
      routes: [],
    }));
  }

  updateRoute(routeName: string, newState: (route: RequestRoute) => RequestRoute) {
    const index = this.value.routes.findIndex(r => r.name === routeName);
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
