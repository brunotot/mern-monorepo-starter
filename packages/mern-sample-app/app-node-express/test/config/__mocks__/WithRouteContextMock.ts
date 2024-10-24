import type { RouteContextMiddleware } from "../../../dist/app/infrastructure/middleware/withRouteContext";
import type { RequestHandler } from "express";
import type { ClientSession } from "mongodb";

function empty(): RequestHandler {
  return (_req, _res, next) => {
    next();
  };
}

export class WithRouteContextMock implements RouteContextMiddleware {
  getSession(): ClientSession | undefined {
    return undefined;
  }
  middleware(): RequestHandler[] {
    return [empty()];
  }
}
