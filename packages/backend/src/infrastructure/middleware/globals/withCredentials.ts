/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import type { AllowedOrigin } from "@internal";
import { VAR_ALLOWED_ORIGINS } from "@internal";
import type { RequestHandler } from "express";

export function withCredentials(): RequestHandler {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && VAR_ALLOWED_ORIGINS.includes(origin as AllowedOrigin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
}

/** @hidden */
export const withCredentialsMiddleware = withCredentials();
