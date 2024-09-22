/**
 * @packageDocumentation
 *
 * ## Overview
 * This module defines and exports the middleware stack used by **all** Express routes.
 * The middleware is applied in a specific order to handle various tasks such as serving static assets,
 * managing sessions, handling security, and logging, ensuring that requests are processed securely and efficiently.
 *
 * ## Features
 * - Serves static assets
 * - Manages sessions and request context
 * - Compresses HTTP responses
 * - Parses JSON, cookies, and URL-encoded bodies
 * - Implements CORS and credentials handling
 * - Adds security layers (CSP, HPP)
 * - Logs HTTP requests with Morgan
 * - Handles route authorization
 *
 * ## How to Use
 * ```ts
 * import { ExpressApp } from "@org/app-node-express/ExpressApp"
 * import { middleware } from "@org/app-node-express/middleware";
 *
 * const app = new ExpressApp({ middleware });
 * ```
 *
 * ## Customization
 * - **Add/Remove Middleware**: Modify the `middleware` array to add or remove specific middleware functions.
 * - **Rearrange Order**: Be cautious when changing the order, as some middleware (like `withStaticAssets`) must run first for optimal performance.
 *
 * @module middleware
 */

import { withAuthorization } from "@org/app-node-express/infrastructure/middleware/withAuthorization";
import { withMorgan } from "@org/app-node-express/infrastructure/middleware/withMorgan";
import { withRouteContext } from "@org/app-node-express/infrastructure/middleware/withRouteContext";
import { withRouteSession } from "@org/app-node-express/infrastructure/middleware/withRouteSession";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { withCompression } from "@org/app-node-express/middleware/withCompression";
import { withCookieParser } from "@org/app-node-express/middleware/withCookieParser";
import { withCors } from "@org/app-node-express/middleware/withCors";
import { withCredentials } from "@org/app-node-express/middleware/withCredentials";
import { withCsp } from "@org/app-node-express/middleware/withCsp";
import { withHpp } from "@org/app-node-express/middleware/withHpp";
import { withJsonParser } from "@org/app-node-express/middleware/withJsonParser";
import { withStaticAssets } from "@org/app-node-express/middleware/withStaticAssets";
import { withUrlEncoded } from "@org/app-node-express/middleware/withUrlEncoded";

export const middleware = [
  withStaticAssets(),
  withRouteSession(),
  withRouteContext(),
  withCompression(),
  withCookieParser(),
  withCors(),
  withCredentials(),
  withCsp(),
  withHpp(),
  withJsonParser(),
  withMorgan(),
  withUrlEncoded(),
  withAuthorization(),
] as const satisfies RouteMiddlewareFactory[];
