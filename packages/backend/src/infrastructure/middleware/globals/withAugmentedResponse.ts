/**
 * @packageDocumentation Middleware which augments the response object with a custom method to send error responses.
 */

import { RequestHandler } from "express";
import { HttpStatusNumeric } from "../../../config";
import { ErrorResponse } from "../../errors/ResponseError";

export function withAugmentedResponse(): RequestHandler {
  return (req, res, next) => {
    // @ts-expect-error TypeScript doesn't know about this property yet
    res.sendError = function (
      status: HttpStatusNumeric,
      details: string,
      metadata: Record<string, unknown> = {},
    ): never {
      throw new ErrorResponse(req, status, details, metadata);
    };
    next();
  };
}

/** @hidden */
export const withAugmentedResponseMiddleware = withAugmentedResponse();
