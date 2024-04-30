import type { HttpResponseStatus } from "@models";

declare global {
  namespace Express {
    export interface Response {
      sendError: (
        httpStatus: HttpResponseStatus,
        details?: string,
        metadata?: Record<string, unknown>,
      ) => never;
    }

    export interface Request {
      decoratorContext: DecoratorContext;
    }
  }
}
