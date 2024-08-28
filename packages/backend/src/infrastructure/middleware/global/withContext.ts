/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import { runWithContext, setRequestContext } from "@org/backend/config/RequestContext.config";
import { DatabaseManager } from "@org/backend/config/DatabaseManager.config";

export const withContext: RouteMiddlewareFactory = () => {
  return (req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      return next();
    }
    runWithContext(() => {
      const session = DatabaseManager.getInstance().client.startSession();
      setRequestContext("session", session);
      next();
    });
  };
};
