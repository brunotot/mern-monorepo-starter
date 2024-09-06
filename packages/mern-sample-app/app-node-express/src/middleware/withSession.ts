/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import session from "express-session";
import { keycloakMemoryStore } from "@org/app-node-express/lib/keycloak-connect";

export const withSession: RouteMiddlewareFactory = () => {
  return session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: keycloakMemoryStore,
  });
};
