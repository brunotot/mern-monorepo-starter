import type { HttpStatusNumeric } from "@internal";

declare global {
  namespace Express {
    export interface Response {
      sendError: (
        httpStatus: HttpStatusNumeric,
        details?: string,
        metadata?: Record<string, unknown>,
      ) => never;
    }
    export interface Request {
      decoratorContext: DecoratorContext;
    }
  }
}
