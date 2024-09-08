/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import * as storage from "@org/app-node-express/config/SessionStorage";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb/MongoDatabaseService";

export const withContext: RouteMiddlewareFactory = () => {
  return (req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      return next();
    }
    storage.runWithContext(() => {
      const session = MongoDatabaseService.getInstance().client.startSession();
      storage.setRequestContext(storage.SESSION_STORAGE_KEY, session);
      next();
    });
  };
};
