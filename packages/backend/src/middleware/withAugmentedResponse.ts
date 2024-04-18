import { HttpStatusNumeric } from "../config";
import { ErrorResponse } from "../errors/ResponseError";
import { ExpressMiddleware } from "./types";

export function withAugmentedResponse(): ExpressMiddleware {
  return (req, res, next) => {
    // @ts-expect-error TypeScript doesn't know about this property yet
    res.sendError = function (status: HttpStatusNumeric, details: string): never {
      throw new ErrorResponse(req, status, details);
    };
    next();
  };
}
