/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to configure and enable CORS (Cross-Origin Resource Sharing).
 * @see {@link https://www.npmjs.com/package/cors cors}
 * @see {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing cors wiki}
 * @why Configures CORS to allow or restrict cross-origin requests based on the application's environment variables, enhancing security and flexibility.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { env } from "@org/app-node-express/server/env";
import cors from "cors";

/**
 * Provides a middleware factory to configure and enable CORS (Cross-Origin Resource Sharing).
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withCors(): RouteMiddlewareFactory {
  return () => [
    cors({
      credentials: env.CORS_CREDENTIALS,
      origin: env.CORS_ALLOWED_ORIGINS,
      methods: env.CORS_ALLOWED_METHODS,
      allowedHeaders: env.CORS_ALLOWED_HEADERS,
    }),
  ];
}
