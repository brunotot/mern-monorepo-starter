import session from "express-session";
import createMemoryStore from "memorystore";
import { env } from "@/server/env";

const MemoryStore = createMemoryStore(session);

const CHECK_PERIOD_IN_MS = env.KEYCLOAK_SESSION_EXPIRES_IN_HOURS * 60 * 60 * 1_000;

export const keycloakMemoryStore: session.MemoryStore = new MemoryStore({
  checkPeriod: CHECK_PERIOD_IN_MS,
});
