import type { LayoutVariant } from "../models";

import { effect, signal } from "@preact/signals-react";

import { LocalStorage } from "../LocalStorage";

export const sigLayoutVariant = signal<LayoutVariant>(
  LocalStorage.get("layoutVariant", "SidebarLayout"),
);

effect(() => {
  LocalStorage.set("layoutVariant", sigLayoutVariant.value);
});
