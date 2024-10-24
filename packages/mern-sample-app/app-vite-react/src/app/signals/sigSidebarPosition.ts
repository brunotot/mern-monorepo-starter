import type { SidebarPosition } from "../models";

import { effect, signal } from "@preact/signals-react";

import { LocalStorage } from "../../server/LocalStorage";

export const sigSidebarPosition = signal<SidebarPosition>(
  LocalStorage.get("sidebarPosition", "right"),
);

effect(() => {
  LocalStorage.set("sidebarPosition", sigSidebarPosition.value);
});
