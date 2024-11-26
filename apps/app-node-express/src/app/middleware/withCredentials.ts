/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to handle setting CORS credentials headers for allowed origins.
 * @why Dynamically sets the `Access-Control-Allow-Credentials` header to allow cookies and other credentials in cross-origin requests for trusted origins.
 */

import type { middleware } from "@/app/middleware/index";
import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import { env } from "@/server/env";

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
