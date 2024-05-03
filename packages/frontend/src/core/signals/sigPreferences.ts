import { effect, signal } from "@preact/signals-react";
import { Breakpoint } from "@mui/material";

const DEFAULT_PREFERENCES: Preferences = {
  containerWidth: "xl",
};

export type Preferences = {
  containerWidth: Breakpoint | false;
};

export function getJsonItem<const T extends Required<Record<string, unknown>>>(
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

const PREFERENCES_KEY = "preferences";

export const sigPreferences = signal<Preferences>(
  getJsonItem(PREFERENCES_KEY, DEFAULT_PREFERENCES),
);

effect(() => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(sigPreferences.value));
});
