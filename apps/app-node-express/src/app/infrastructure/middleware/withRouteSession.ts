/**
 * @packageDocumentation
 */

import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import type { RequestHandler } from "express";
import { IocRegistry, inject } from "@/lib/ioc";
import { buildKeycloakSession } from "@/lib/keycloak";

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
