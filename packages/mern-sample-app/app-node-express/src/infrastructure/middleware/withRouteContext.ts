/**
 * @packageDocumentation Middleware which manages context for route sessions.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { RequestHandler } from "express";
import type { ClientSession } from "mongodb";

import { AsyncLocalStorage } from "async_hooks";

import { inject } from "@org/app-node-express/infrastructure/decorators";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb/MongoDatabaseService";

type RouteContextProps = {
  mongoClientSession: ClientSession;
};

export interface RouteContextMiddleware {
  getSession(): ClientSession | undefined;
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
