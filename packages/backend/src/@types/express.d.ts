import { HttpStatusNumeric } from "../config";

declare global {
  namespace Express {
    export interface Response {
      sendError: (
        httpStatus: HttpStatusNumeric,
        details?: string,
        metadata?: Record<string, unknown>,
      ) => never;
    }
  }
}
