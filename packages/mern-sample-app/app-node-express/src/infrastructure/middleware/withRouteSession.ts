/**
 * @packageDocumentation Middleware which manages context for route sessions.
 */

import { AsyncLocalStorage } from "async_hooks";

import { testMode } from "@org/app-node-express/env";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb/MongoDatabaseService";
import { type ClientSession } from "mongodb";

type Session = {
  mongoClientSession: ClientSession;
};

const STORAGE = new AsyncLocalStorage<Session>();

export function getSession(): Session {
  return STORAGE.getStore()!;
}

export const withRouteSession: RouteMiddlewareFactory = () => {
  if (testMode()) return (_req, _res, next) => next();
  return (_req, _res, next) => {
    runWithSession(() => {
      const mongoClientSession = MongoDatabaseService.getInstance().client.startSession();
      registerSession({ mongoClientSession });
      next();
    });
  };
};

function registerSession(session: Session) {
  const store = STORAGE.getStore();
  if (!store) return;
  Object.entries(session).forEach(([key, value]) => (store[key as keyof typeof store] = value));
}

function runWithSession(fn: () => void) {
  const store = STORAGE.getStore();
  if (!store) return;
  STORAGE.run(store, fn);
}
