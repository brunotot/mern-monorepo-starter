import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export const keycloakMemoryStore: session.MemoryStore = new MemoryStore({
  checkPeriod: 86400000, // prune expired entries every 24h
});
