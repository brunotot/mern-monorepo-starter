/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/config/Route.config";
import {
  runWithContext,
  setRequestContext,
} from "@org/app-node-express/config/RequestContext.config";
import { DatabaseManager } from "@org/app-node-express/config/DatabaseManager.config";

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
