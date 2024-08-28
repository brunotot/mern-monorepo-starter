import session from "express-session";

export const keycloakMemoryStore = new session.MemoryStore();
