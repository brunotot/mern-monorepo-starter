/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to set request timeouts.
 * @see {@link https://www.npmjs.com/package/connect-timeout connect-timeout}
 * @why Ensures that requests do not hang indefinitely by setting a timeout limit for both the request and the overall connection.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { middleware } from "@org/app-node-express/middleware/index";

import { env } from "@org/app-node-express/env";
import timeout from "connect-timeout";

/**
 * Provides a middleware factory to set request timeouts.
 * @see {@link env.SERVER_TIMEOUT_IN_MINS SERVER_TIMEOUT_IN_MINS}
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withTimeout(): RouteMiddlewareFactory {
  return () => [
    (req, _res, next) => {
      const oneMinuteInMilliseconds = 60 * 1000;
      const timeout = env.SERVER_TIMEOUT_IN_MINS * oneMinuteInMilliseconds + 1;
      req.setTimeout(timeout);
      next();
    },
    timeout(`${env.SERVER_TIMEOUT_IN_MINS}ms`),
  ];
}
