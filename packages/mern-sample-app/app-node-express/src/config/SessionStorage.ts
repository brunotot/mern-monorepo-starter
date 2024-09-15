import { type ClientSession } from "mongodb";
import { AsyncLocalStorage } from "async_hooks";

export type Session = {
  mongoClientSession: ClientSession;
};

const STORAGE = new AsyncLocalStorage<Session>();

export function getSession(): Session {
  return STORAGE.getStore()!;
}

export function registerSession(session: Session) {
  const store = STORAGE.getStore();
  if (!store) return;
  Object.entries(session).forEach(([key, value]) => (store[key as keyof typeof store] = value));
}

export function runWithSession(fn: () => void) {
  const store = STORAGE.getStore();
  if (!store) return;
  STORAGE.run(store, fn);
}
