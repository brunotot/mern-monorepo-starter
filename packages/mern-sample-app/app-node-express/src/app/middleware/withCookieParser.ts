/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to enable cookie parsing in HTTP requests.
 * @see {@link https://www.npmjs.com/package/cookie-parser cookie-parser}
 * @why Enables the application to parse cookies from incoming requests, allowing access to cookie data in routes and middleware.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import cookieParser from "cookie-parser";

/**
 * Provides a middleware factory to enable cookie parsing in HTTP requests.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withCookieParser(): RouteMiddlewareFactory {
  return () => [cookieParser()];
}
