/**
 * @packageDocumentation Middleware which augments the response object with a custom method to send error responses.
 */

import type { RequestHandler } from "express";

import { ErrorResponse } from "@internal";
import type { HttpStatusNumeric } from "@types";

export function withExpressOverrides(): RequestHandler {
  return (req, res, next) => {
    res.sendError = function (
      status: HttpStatusNumeric,
      details: string = "Unknown",
      metadata: Record<string, unknown> = {},
    ): never {
      throw new ErrorResponse(req, status, details, metadata);
    };
    next();
  };
}

/** @hidden */
export const withExpressOverridesMiddleware = withExpressOverrides();
