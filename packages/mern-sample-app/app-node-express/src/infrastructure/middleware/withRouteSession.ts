/**
 * @packageDocumentation
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { RequestHandler } from "express";

import { inject } from "@org/app-node-express/infrastructure/decorators";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { buildKeycloakSession } from "@org/app-node-express/lib/keycloak";

const IOC_KEY = "withRouteSession";

export interface RouteSessionMiddleware {
  middleware(): RequestHandler[];
}

@inject(IOC_KEY)
export class WithRouteSession implements RouteSessionMiddleware {
  middleware(): RequestHandler[] {
    return [buildKeycloakSession()];
  }
}

export function withRouteSession(): RouteMiddlewareFactory {
  return () => {
    return IocRegistry.getInstance().inject<RouteSessionMiddleware>(IOC_KEY).middleware();
  };
}
