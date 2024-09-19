/**
 * @packageDocumentation
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { RequestHandler } from "express";

import { env } from "@org/app-node-express/env";
import { inject } from "@org/app-node-express/infrastructure/decorators";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { keycloakMemoryStore } from "@org/app-node-express/lib/keycloak";
import session from "express-session";

const IOC_KEY = "withRouteSession";

export interface RouteSessionMiddleware {
  middleware(): RequestHandler[];
}

@inject(IOC_KEY)
export class WithRouteSession implements RouteSessionMiddleware {
  middleware(): RequestHandler[] {
    return [
      session({
        secret: env.SERVER_SESSION_SECRET,
        resave: false,
        // TODO Check if false is okay (it is verified it works with true)
        saveUninitialized: false,
        store: keycloakMemoryStore,
      }),
    ];
  }
}

export function withRouteSession(): RouteMiddlewareFactory {
  return () => IocRegistry.getInstance().inject<RouteSessionMiddleware>(IOC_KEY).middleware();
}
