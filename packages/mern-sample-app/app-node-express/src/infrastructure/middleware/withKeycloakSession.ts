/**
 * @packageDocumentation
 */

import { env } from "@org/app-node-express/env";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { keycloakMemoryStore } from "@org/app-node-express/lib/keycloak";
import session from "express-session";

export const withKeycloakSession: RouteMiddlewareFactory = () => {
  return session({
    secret: env.SERVER_SESSION_SECRET,
    resave: false,
    // TODO Check if false is okay (it is verified it works with true)
    saveUninitialized: false,
    store: keycloakMemoryStore,
  });
};
