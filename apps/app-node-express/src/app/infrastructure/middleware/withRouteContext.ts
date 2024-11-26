/**
 * @packageDocumentation Middleware which manages context for route sessions.
 */

import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import type { RequestHandler } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { MongoDatabaseService, type mongodb } from "@org/lib-mongodb";
import { IocRegistry, inject } from "@/lib/ioc";

type RouteContextProps = {
  mongoClientSession: mongodb.ClientSession;
};

export interface RouteContextMiddleware {
  getSession(): mongodb.ClientSession | undefined;
  middleware(): RequestHandler[];
}

const IOC_KEY = "withRouteContext";

@inject(IOC_KEY)
export class WithRouteContext implements RouteContextMiddleware {
  private STORAGE: AsyncLocalStorage<RouteContextProps>;

  public constructor() {
    this.STORAGE = new AsyncLocalStorage<RouteContextProps>();
  }

  public getSession() {
    return this.STORAGE.getStore()?.mongoClientSession;
  }

  public middleware(): RequestHandler[] {
    const handler: RequestHandler = (_req, _res, next) => {
      const mongoClientSession = MongoDatabaseService.getInstance().client.startSession();
      const sessionProps: RouteContextProps = { mongoClientSession };

      this.STORAGE.run(sessionProps, () => {
        next();
      });
    };

    return [handler];
  }
}

export function withRouteContext(): RouteMiddlewareFactory {
  return () => IocRegistry.getInstance().inject<RouteContextMiddleware>(IOC_KEY).middleware();
}
