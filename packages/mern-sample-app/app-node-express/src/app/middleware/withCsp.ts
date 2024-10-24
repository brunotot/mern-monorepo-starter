/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to configure Content Security Policy (CSP) and other security headers using Helmet.
 * @see {@link https://www.npmjs.com/package/helmet helmet}
 * @why Adds security headers to protect the application from common vulnerabilities. Specifically adjusts CSP and Cross-Origin Opener Policy for compatibility with Swagger UI.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import helmet from "helmet";

/**
 * Provides a middleware factory to configure Content Security Policy (CSP) and other security headers using Helmet.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withCsp(): RouteMiddlewareFactory {
  // TODO Check if this is still necessary. It used to be a fix for swagger js not loading
  return () => [
    helmet({
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
    }),
  ];
}
