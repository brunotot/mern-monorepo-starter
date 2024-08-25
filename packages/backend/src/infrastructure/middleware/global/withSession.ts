/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import session from "express-session";
import { memoryStore } from "@org/backend/infrastructure/security/KeycloakSession";

export const withSession: RouteMiddlewareFactory = () => {
  return session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  });
};
