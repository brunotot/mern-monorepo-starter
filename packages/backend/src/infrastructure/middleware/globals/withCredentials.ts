/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import { RequestHandler } from "express";
import { $BackendAppConfig, AllowedOrigin } from "../../../config";

export function withCredentials(): RequestHandler {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && $BackendAppConfig.allowedOrigins.includes(origin as AllowedOrigin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
}

/** @hidden */
export const withCredentialsMiddleware = withCredentials();
