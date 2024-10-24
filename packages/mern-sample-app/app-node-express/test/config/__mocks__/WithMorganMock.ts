import { type RequestHandler } from "express";

import { type MorganMiddleware } from "../../../dist/app/infrastructure/middleware/withMorgan";

export class WithMorganMock implements MorganMiddleware {
  middleware(): RequestHandler[] {
    return [
      (_req, _res, next) => {
        next();
      },
    ];
  }
}
