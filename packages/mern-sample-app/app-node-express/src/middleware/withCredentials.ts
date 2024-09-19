/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { env } from "@org/app-node-express/env";

export function withCredentials(): RouteMiddlewareFactory {
  return () => [
    (req, res, next) => {
      const origin = req.headers.origin;
      if (origin && env.CORS_ALLOWED_ORIGINS.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
      }
      next();
    },
  ];
}
