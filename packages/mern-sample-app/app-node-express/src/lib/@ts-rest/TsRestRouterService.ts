import type { RequestHandler } from "express";
import type { AppRoute } from "@ts-rest/core";
import { type TODO } from "@org/lib-commons";
import { contracts } from "@org/lib-api-client";

export class TsRestRouterService {
  private static instance: TsRestRouterService;

  #routers: TODO;

  public static getInstance(): TsRestRouterService {
    TsRestRouterService.instance ??= new TsRestRouterService();
    return TsRestRouterService.instance;
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
