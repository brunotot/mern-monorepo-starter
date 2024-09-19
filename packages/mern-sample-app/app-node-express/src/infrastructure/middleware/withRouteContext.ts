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
      this.runWithSession(() => {
        const mongoClientSession = MongoDatabaseService.getInstance().client.startSession();
        this.registerSession({ mongoClientSession });
        next();
      });
    };

    return [handler];
  }

  private registerSession(session: RouteContextProps) {
    const store = this.STORAGE.getStore();
    if (!store) return;
    Object.entries(session).forEach(([key, value]) => (store[key as keyof typeof store] = value));
  }

  private runWithSession(fn: () => void) {
    const store = this.STORAGE.getStore();
    if (!store) return;
    this.STORAGE.run(store, fn);
  }
}

export function withRouteContext(): RouteMiddlewareFactory {
  return () => IocRegistry.getInstance().inject<RouteContextMiddleware>(IOC_KEY).middleware();
}
