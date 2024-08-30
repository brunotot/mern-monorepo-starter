/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/config/Route.config";
import session from "express-session";
import { keycloakMemoryStore } from "@org/app-node-express/infrastructure/security/KeycloakMemoryStore";

export const withSession: RouteMiddlewareFactory = () => {
  return session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: keycloakMemoryStore,
  });
};
