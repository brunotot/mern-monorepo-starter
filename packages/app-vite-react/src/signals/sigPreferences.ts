import { effect, signal } from "@preact/signals-react";
import type { Breakpoint } from "@mui/material";

export type GuiPreferences = {
  containerWidth: Breakpoint | false;
};

const DEFAULT_PREFERENCES: GuiPreferences = {
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

export const sigPreferences = signal<GuiPreferences>(
  getJsonItem(PREFERENCES_KEY, DEFAULT_PREFERENCES),
);

effect(() => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(sigPreferences.value));
});
