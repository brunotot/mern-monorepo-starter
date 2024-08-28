import { type TODO } from "@org/shared";
import type { AppRouteImplementation } from "@ts-rest/express";
import type { AppRoute, ServerInferResponses } from "@ts-rest/core";
import { contracts } from "@org/shared";
import type { RequestHandler } from "express";

export type RouteOutput<Route extends AppRoute> = Promise<ServerInferResponses<Route>>;

export type RouteInput<Route extends AppRoute> = Parameters<AppRouteImplementation<Route>>[0];

export type RouteHandler<Route extends AppRoute> = (data: RouteInput<Route>) => RouteOutput<Route>;

export type RouteMiddlewareFactory = () => RequestHandler | RequestHandler[];

export class RouteCollection {
  private static instance: RouteCollection;

  #routers: TODO;

  public static getInstance(): RouteCollection {
    RouteCollection.instance ??= new RouteCollection();
    return RouteCollection.instance;
  }

  private constructor() {
    this.#routers = {};
  }

  addRouter(routeContract: AppRoute, handler: TODO, middleware: RequestHandler[]) {
    for (const [controllerName, controllerRoutes] of Object.entries(contracts)) {
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
