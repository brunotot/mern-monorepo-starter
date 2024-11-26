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
 * import { ExpressApp } from "@/ExpressApp"
 * import { middleware } from "@/middleware";
 *
 * const app = new ExpressApp({ middleware });
 * ```
 *
 * @see {@link middleware Collection of all global middleware}
 */

import { getTypedError } from "@org/lib-api-client";
import { withAuthorization } from "@/app/infrastructure/middleware/withAuthorization";
import { withMorgan } from "@/app/infrastructure/middleware/withMorgan";
import { withRouteContext } from "@/app/infrastructure/middleware/withRouteContext";
import { withRouteSession } from "@/app/infrastructure/middleware/withRouteSession";
import { withCompression } from "@/app/middleware/withCompression";
import { withCookieParser } from "@/app/middleware/withCookieParser";
import { withCors } from "@/app/middleware/withCors";
import { withCredentials } from "@/app/middleware/withCredentials";
import { withCsp } from "@/app/middleware/withCsp";
import { withHpp } from "@/app/middleware/withHpp";
import { withJsonParser } from "@/app/middleware/withJsonParser";
import { withStaticAssets } from "@/app/middleware/withStaticAssets";
import { withUrlEncoded } from "@/app/middleware/withUrlEncoded";
import { type RouteMiddlewareFactory } from "@/lib/@ts-rest";
import { log } from "@/lib/winston";

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
 * - &nbsp;&nbsp;1 &nbsp;{@link withStaticAssets withStaticAssets}
 * - &nbsp;&nbsp;2 &nbsp;{@link withJsonParser withJsonParser}
 * - &nbsp;&nbsp;3 &nbsp;{@link withRouteSession withRouteSession}
 * - &nbsp;&nbsp;4 &nbsp;{@link withCompression withCompression}
 * - &nbsp;&nbsp;5 &nbsp;{@link withRouteContext withRouteContext}
 * - &nbsp;&nbsp;6 &nbsp;{@link withCookieParser withCookieParser}
 * - &nbsp;&nbsp;7 &nbsp;{@link withCors withCors}
 * - &nbsp;&nbsp;8 &nbsp;{@link withCredentials withCredentials}
 * - &nbsp;&nbsp;9 &nbsp;{@link withCsp withCsp}
 * - 10 &nbsp;{@link withHpp withHpp}
 * - 11 &nbsp;{@link withMorgan withMorgan}
 * - 12 &nbsp;{@link withUrlEncoded withUrlEncoded}
 * - 13 &nbsp;{@link withAuthorization withAuthorization}
 */
export const middleware = [
  __debug_middleware__(withStaticAssets.name, withStaticAssets()),
  __debug_middleware__(withJsonParser.name, withJsonParser()),
  __debug_middleware__(withRouteSession.name, withRouteSession()),
  __debug_middleware__(withCompression.name, withCompression()),
  __debug_middleware__(withRouteContext.name, withRouteContext()),
  __debug_middleware__(withCookieParser.name, withCookieParser()),
  __debug_middleware__(withCors.name, withCors()),
  __debug_middleware__(withCredentials.name, withCredentials()),
  __debug_middleware__(withCsp.name, withCsp()),
  __debug_middleware__(withHpp.name, withHpp()),
  __debug_middleware__(withMorgan.name, withMorgan()),
  __debug_middleware__(withUrlEncoded.name, withUrlEncoded()),
  __debug_middleware__(withAuthorization.name, withAuthorization()),
] as const satisfies RouteMiddlewareFactory[];
