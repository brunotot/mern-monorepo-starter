/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import { runWithContext, setRequestContext } from "../utils/RequestContext";
import { DatabaseManager } from "@org/backend/config/managers/DatabaseManager";

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
