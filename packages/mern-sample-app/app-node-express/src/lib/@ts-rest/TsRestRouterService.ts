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

type TsRestRouteName = {
  controllerName: string;
  functionName: string;
};

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

  public validateAllRoutesToBeImplemented() {
    const routeDefinitionNames: string[] = this.getRouteDefinitionNames();
    const routeImplementationNames: string[] = this.getRouteImplementationNames();
    const namesWhichAreNotImplemented: string[] = routeDefinitionNames.filter(
      name => !routeImplementationNames.includes(name),
    );
    if (namesWhichAreNotImplemented.length > 0) {
      throw new Error(
        `The following routes are not implemented:\n\n\t> ${namesWhichAreNotImplemented.join("\n\t")}\n`,
      );
    }
  }

  public getTotalRouteCount() {
    return this.getRouteDefinitionNames().length;
  }

  public getRouters(): RouterImplementation<typeof contracts> {
    return this.getRoutersSystem();
  }

  public addRouter(
    routeContract: AppRoute,
    handler: (data: unknown) => Promise<unknown>,
    middlewareFactories: RouteMiddlewareFactory[],
  ) {
    const routeName = this.getRouteName(routeContract);
    if (!routeName) return;
    const { controllerName, functionName } = routeName;
    this.#routers[controllerName][functionName] = {
      handler,
      middleware: middlewareFactories,
    };
  }

  private getRouteDefinitionNames(): string[] {
    return Object.entries(contracts)
      .map(([name, value]) => Object.keys(value).map(k => `${name}.${k}`))
      .flat();
  }

  private getRouteImplementationNames() {
    return Object.entries(this.#routers)
      .map(([name, value]) => Object.keys(value).map(k => `${name}.${k}`))
      .flat();
  }

  private getRouteName(routeContract: AppRoute): TsRestRouteName | null {
    for (const [controllerName, controllerRoutes] of Object.entries(contracts)) {
      for (const [functionName, route] of Object.entries(controllerRoutes)) {
        if (route !== routeContract) continue;
        this.#routers[controllerName] ??= {};
        return { controllerName, functionName };
      }
    }
    return null;
  }

  private getRoutersSystem(): RouterImplementation<typeof contracts> {
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
