/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to prevent HTTP parameter pollution.
 * @see {@link https://www.npmjs.com/package/hpp hpp}
 * @see {@link https://en.wikipedia.org/wiki/HTTP_parameter_pollution|http parameter pollution wiki}
 * @why Protects the application by preventing attackers from sending duplicate query parameters, which could lead to unexpected behavior or security vulnerabilities.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import hpp from "hpp";

/**
 * Provides a middleware factory to prevent HTTP parameter pollution.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withHpp(): RouteMiddlewareFactory {
  return () => [hpp()];
}
