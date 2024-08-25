import { CONTRACTS, type TODO } from "@org/shared";
import { type AppRoute } from "@ts-rest/core";
import type { Request, Response, NextFunction } from "express";

export type RouteMiddlewareFactory = () => RouteMiddleware | RouteMiddleware[];

export type RouteMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export class RouterCollection {
  private static instance: RouterCollection;

  #routers: TODO;

  public static getInstance(): RouterCollection {
    RouterCollection.instance ??= new RouterCollection();
    return RouterCollection.instance;
  }

  private constructor() {
    this.#routers = {};
  }

  addRouter(routeContract: AppRoute, handler: TODO, middleware: RouteMiddleware[]) {
    for (const [controllerName, controllerRoutes] of Object.entries(CONTRACTS)) {
      for (const [functionName, route] of Object.entries(controllerRoutes)) {
        if (route !== routeContract) continue;
        this.#routers[controllerName] ??= {};
        this.#routers[controllerName][functionName] = { handler, middleware };
        return;
      }
    }
  }

  getRouters() {
    return this.#routers;
  }
}
