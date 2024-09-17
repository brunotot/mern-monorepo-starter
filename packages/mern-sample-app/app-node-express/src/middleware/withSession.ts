/**
 * @packageDocumentation
 */

import session from "express-session";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { env } from "@org/app-node-express/env";
import { keycloakMemoryStore as store } from "@org/app-node-express/lib/keycloak";

export const withSession: RouteMiddlewareFactory = () => {
  return session({
    secret: env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  });
};
