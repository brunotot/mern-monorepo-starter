import { effect, signal } from "@preact/signals-react";
import { type UiPreferences } from "@org/app-vite-react/config/UiPreferences.config";

const DEFAULT_PREFERENCES: UiPreferences = {
  containerWidth: "xl",
};

const PREFERENCES_KEY = "preferences";

function getJsonItem<const T extends Required<Record<string, unknown>>>(
  key: string,
  defaults: T,
): T {
  const item = localStorage.getItem(key) ?? "{}";
  let json = {} as T;
  try {
    json = JSON.parse(item);
  } catch (e) {
    console.warn("Unable to parse preferences", e);
    json = {} as T;
  }
  return { ...defaults, ...json } as T;
}

export const sigPreferences = signal<UiPreferences>(
  getJsonItem(PREFERENCES_KEY, DEFAULT_PREFERENCES),
);

effect(() => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(sigPreferences.value));
});
