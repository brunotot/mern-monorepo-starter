import type { RouteSecuredMiddleware } from "@/app/infrastructure/middleware/withRouteSecured";
import type { RequestHandler } from "express";

export class WithRouteSecuredMock implements RouteSecuredMiddleware {
  middleware(): RequestHandler[] {
    return [
      (_req, _res, next) => {
        next();
      },
    ];
  }
}
