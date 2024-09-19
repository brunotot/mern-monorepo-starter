/**
 * @packageDocumentation Connect/Express middleware that can be used to enable CORS with various options.
 * @see {@link https://www.npmjs.com/package/cors|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing|cors wiki}
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { env } from "@org/app-node-express/env";
import cors from "cors";

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
