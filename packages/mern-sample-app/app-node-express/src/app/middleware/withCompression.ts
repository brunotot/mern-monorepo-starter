/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to enable HTTP response compression.
 * @see {@link https://www.npmjs.com/package/compression compression}
 * @why Enables response compression to improve performance and reduce bandwidth usage in the application.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import compression from "compression";

/**
 * Provides a middleware factory to enable HTTP response compression.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withCompression(): RouteMiddlewareFactory {
  return () => [compression()];
}
