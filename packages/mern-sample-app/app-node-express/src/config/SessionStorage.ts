import { type TODO } from "@org/lib-commons";
import { AsyncLocalStorage } from "async_hooks";

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, TODO>>();

export const SESSION_STORAGE_KEY = "session";

export function setRequestContext(key: string, value: TODO) {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.set(key, value);
  }
}

export function runWithContext(fn: () => void) {
  const store = new Map<string, TODO>();
  asyncLocalStorage.run(store, fn);
}
