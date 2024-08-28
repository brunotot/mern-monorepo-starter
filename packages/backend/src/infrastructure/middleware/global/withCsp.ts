/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import helmet from "helmet";

export const withCsp: RouteMiddlewareFactory = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "connect-src": ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginOpenerPolicy: {
      policy: "unsafe-none",
    },
  });
};
