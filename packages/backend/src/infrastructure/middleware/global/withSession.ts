/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import session from "express-session";
import { keycloakMemoryStore } from "@org/backend/infrastructure/security/KeycloakMemoryStore";

export const withSession: RouteMiddlewareFactory = () => {
  return session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: keycloakMemoryStore,
  });
};
