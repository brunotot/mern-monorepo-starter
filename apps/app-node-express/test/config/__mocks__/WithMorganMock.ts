import type { MorganMiddleware } from "@/app/infrastructure/middleware/withMorgan";
import type { RequestHandler } from "express";

export class WithMorganMock implements MorganMiddleware {
  middleware(): RequestHandler[] {
    return [
      (_req, _res, next) => {
        next();
      },
    ];
  }
}
