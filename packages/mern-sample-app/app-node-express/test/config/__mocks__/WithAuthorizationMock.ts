import type { AuthorizationMiddleware } from "../../../dist/infrastructure/middleware/withAuthorization";

import { type RequestHandler } from "express";

export class WithAuthorizationMock implements AuthorizationMiddleware {
  middleware(): RequestHandler[] {
    return [
      (_req, _res, next) => {
        next();
      },
    ];
  }

  protect(): RequestHandler {
    return (_req, _res, next) => {
      next();
    };
  }
}
