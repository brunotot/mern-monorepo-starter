import type { RequestHandler } from "express";
import session from "express-session";
import { keycloakMemoryStore } from "@/lib/keycloak";
import { env } from "@/server/env";

export function buildKeycloakSession(): RequestHandler {
  return session({
    secret: env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: keycloakMemoryStore,
  });
}
