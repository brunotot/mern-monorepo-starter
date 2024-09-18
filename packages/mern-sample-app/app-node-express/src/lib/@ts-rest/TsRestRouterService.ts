import type { AppRoute } from "@ts-rest/core";
import type { RequestHandler } from "express";

import { contracts } from "@org/lib-api-client";
import { type TODO } from "@org/lib-commons";

export class TsRestRouterService {
  private static instance: TsRestRouterService;

  #routers: Record<
    string,
    Record<
      string,
      {
        handler: (data: unknown) => Promise<unknown>;
        middleware: RequestHandler[];
      }
    >
  >;

  public static getInstance(): TsRestRouterService {
    TsRestRouterService.instance ??= new TsRestRouterService();
    return TsRestRouterService.instance;
  }

  private constructor() {
    this.#routers = {};
  }

  addRouter(
    routeContract: AppRoute,
    handler: (data: unknown) => Promise<unknown>,
    middleware: RequestHandler[],
  ) {
    for (const [controllerName, controllerRoutes] of Object.entries(contracts)) {
      for (const [functionName, route] of Object.entries(controllerRoutes)) {
        if (route !== routeContract) continue;
        this.#routers[controllerName] ??= {};
        this.#routers[controllerName][functionName] = { handler, middleware };
        return;
      }
    }
  }

  getRouters(): TODO {
    return this.#routers;
  }
}
