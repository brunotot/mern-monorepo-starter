import type { RequestHandler } from "express";

import { env } from "@org/app-node-express/env";
import { keycloakMemoryStore } from "@org/app-node-express/lib/keycloak";
import session from "express-session";

export function buildKeycloakSession(): RequestHandler {
  return session({
    secret: env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: keycloakMemoryStore,
  });
}
