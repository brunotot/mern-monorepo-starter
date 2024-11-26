import type { LayoutWidth } from "../models";

import { effect, signal } from "@preact/signals-react";

import { LocalStorage } from "../../server/LocalStorage";

export const LAYOUT_WIDTH_OPTIONS: LayoutWidth[] = [false, "sm", "md", "lg", "xl"];

export const sigLayoutWidth = signal<LayoutWidth>(LocalStorage.get("layoutWidth", "xl"));

effect(() => {
  LocalStorage.set("layoutWidth", sigLayoutWidth.value);
});
