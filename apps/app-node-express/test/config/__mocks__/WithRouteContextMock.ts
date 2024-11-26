import type { RouteContextMiddleware } from "@/app/infrastructure/middleware/withRouteContext";
import type { mongodb } from "@org/lib-mongodb";
import type { RequestHandler } from "express";

function empty(): RequestHandler {
  return (_req, _res, next) => {
    next();
  };
}

export class WithRouteContextMock implements RouteContextMiddleware {
  getSession(): mongodb.ClientSession | undefined {
    return undefined;
  }
  middleware(): RequestHandler[] {
    return [empty()];
  }
}
