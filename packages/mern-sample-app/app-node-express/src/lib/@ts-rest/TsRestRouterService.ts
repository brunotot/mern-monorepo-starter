import type { RouteMiddlewareFactory } from "./TsRestExpressRouteTypes";
import type { AppRoute } from "@ts-rest/core";
import type { RouterImplementation } from "@ts-rest/express/src/lib/types";
import type { RequestHandler } from "express";

import { contracts } from "@org/lib-api-client";

// prettier-ignore
type TsRestRouterFactory = Record<
  string,
  Record<string, { handler: (data: unknown) => Promise<unknown>; middleware: RouteMiddlewareFactory[]; }>
>;

// prettier-ignore
type TsRestRouter = Record<
  string,
  Record<string, { handler: (data: unknown) => Promise<unknown>; middleware: RequestHandler[]; }>
>;

export class TsRestRouterService {
  private static instance: TsRestRouterService;

  #routers: TsRestRouterFactory;

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
    middlewareFactories: RouteMiddlewareFactory[],
  ) {
    for (const [controllerName, controllerRoutes] of Object.entries(contracts)) {
      for (const [functionName, route] of Object.entries(controllerRoutes)) {
        if (route !== routeContract) continue;
        this.#routers[controllerName] ??= {};
        this.#routers[controllerName][functionName] = {
          handler,
          middleware: middlewareFactories,
        };
        return;
      }
    }
  }

  getRouters(): RouterImplementation<typeof contracts> {
    const routersCopy = { ...this.#routers } as TsRestRouter;

    Object.keys(this.#routers).forEach(controllerName => {
      Object.keys(this.#routers[controllerName]).forEach(method => {
        routersCopy[controllerName][method] = {
          handler: this.#routers[controllerName][method].handler,
          middleware: this.#routers[controllerName][method].middleware.map(fn => fn()).flat(),
        };
      });
    });

    return routersCopy as unknown as RouterImplementation<typeof contracts>;
  }
}
