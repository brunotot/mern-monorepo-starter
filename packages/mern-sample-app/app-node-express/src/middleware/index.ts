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
 * @see {@link middleware Collection of all global middleware}
 */

import { withAuthorization } from "@org/app-node-express/infrastructure/middleware/withAuthorization";
import { withMorgan } from "@org/app-node-express/infrastructure/middleware/withMorgan";
import { withRouteContext } from "@org/app-node-express/infrastructure/middleware/withRouteContext";
import { withRouteSession } from "@org/app-node-express/infrastructure/middleware/withRouteSession";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { log } from "@org/app-node-express/lib/winston";
import { withCompression } from "@org/app-node-express/middleware/withCompression";
import { withCookieParser } from "@org/app-node-express/middleware/withCookieParser";
import { withCors } from "@org/app-node-express/middleware/withCors";
import { withCredentials } from "@org/app-node-express/middleware/withCredentials";
import { withCsp } from "@org/app-node-express/middleware/withCsp";
import { withHpp } from "@org/app-node-express/middleware/withHpp";
import { withJsonParser } from "@org/app-node-express/middleware/withJsonParser";
import { withStaticAssets } from "@org/app-node-express/middleware/withStaticAssets";
import { withUrlEncoded } from "@org/app-node-express/middleware/withUrlEncoded";
import { getTypedError } from "@org/lib-api-client";

function __debug_middleware__(
  middlewareName: string,
  middlewareFactory: RouteMiddlewareFactory,
): RouteMiddlewareFactory {
  return () =>
    middlewareFactory().map(handler => {
      return (req, res, next) => {
        log.debug(`Accessing global middleware "${middlewareName}" from URL "${req.url}"`);
        try {
          return handler(req, res, next);
        } catch (error) {
          next(getTypedError(error));
        }
      };
    });
}

/**
 * Express app global middleware collection (executed in order):
 *
 * - &nbsp;&nbsp;1 &nbsp;{@link withCors withCors}
 * - &nbsp;&nbsp;2 &nbsp;{@link withStaticAssets withStaticAssets}
 * - &nbsp;&nbsp;3 &nbsp;{@link withJsonParser withJsonParser}
 * - &nbsp;&nbsp;4 &nbsp;{@link withRouteSession withRouteSession}
 * - &nbsp;&nbsp;5 &nbsp;{@link withCompression withCompression}
 * - &nbsp;&nbsp;6 &nbsp;{@link withRouteContext withRouteContext}
 * - &nbsp;&nbsp;7 &nbsp;{@link withCookieParser withCookieParser}
 * - &nbsp;&nbsp;8 &nbsp;{@link withCredentials withCredentials}
 * - &nbsp;&nbsp;9 &nbsp;{@link withCsp withCsp}
 * - 10 &nbsp;{@link withHpp withHpp}
 * - 11 &nbsp;{@link withMorgan withMorgan}
 * - 12 &nbsp;{@link withUrlEncoded withUrlEncoded}
 * - 13 &nbsp;{@link withAuthorization withAuthorization}
 */
export const middleware = [
  __debug_middleware__(withCors.name, withCors()),
  __debug_middleware__(withStaticAssets.name, withStaticAssets()),
  __debug_middleware__(withJsonParser.name, withJsonParser()),
  __debug_middleware__(withRouteSession.name, withRouteSession()),
  __debug_middleware__(withCompression.name, withCompression()),
  __debug_middleware__(withRouteContext.name, withRouteContext()),
  __debug_middleware__(withCookieParser.name, withCookieParser()),
  __debug_middleware__(withCredentials.name, withCredentials()),
  __debug_middleware__(withCsp.name, withCsp()),
  __debug_middleware__(withHpp.name, withHpp()),
  __debug_middleware__(withMorgan.name, withMorgan()),
  __debug_middleware__(withUrlEncoded.name, withUrlEncoded()),
  __debug_middleware__(withAuthorization.name, withAuthorization()),
] as const satisfies RouteMiddlewareFactory[];
