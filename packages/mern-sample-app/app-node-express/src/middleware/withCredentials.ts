/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to handle setting CORS credentials headers for allowed origins.
 * @why Dynamically sets the `Access-Control-Allow-Credentials` header to allow cookies and other credentials in cross-origin requests for trusted origins.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { middleware } from "@org/app-node-express/middleware/index";

import { env } from "@org/app-node-express/server/env";

/**
 * Provides a middleware factory to handle setting CORS credentials headers for allowed origins.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
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
