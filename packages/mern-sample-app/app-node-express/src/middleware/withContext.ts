/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb/MongoDatabaseService";
import { runWithSession, registerSession } from "@org/app-node-express/config/SessionStorage";

export const withContext: RouteMiddlewareFactory = () => {
  return (_req, _res, next) => {
    if (process.env.SERVER_ENV === "test") {
      return next();
    }
    runWithSession(() => {
      const mongoClientSession = MongoDatabaseService.getInstance().client.startSession();
      registerSession({ mongoClientSession });
      next();
    });
  };
};
