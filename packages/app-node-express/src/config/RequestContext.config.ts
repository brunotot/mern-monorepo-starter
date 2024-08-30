import { type TODO } from "@org/lib-commons";
import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<Map<string, TODO>>();

export function setRequestContext(key: string, value: TODO) {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.set(key, value);
  }
}

export function getRequestContext<T>(key: string): T | undefined {
  const store = asyncLocalStorage.getStore();
  return store ? (store.get(key) as T) : undefined;
}

export function runWithContext(fn: () => void) {
  const store = new Map<string, TODO>();
  asyncLocalStorage.run(store, fn);
}
