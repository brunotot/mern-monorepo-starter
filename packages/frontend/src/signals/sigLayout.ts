import { effect, signal } from "@preact/signals-react";
import { type LayoutVariant } from "@org/frontend/components/layout";

export const sigLayout = signal<LayoutVariant>(
  (["HorizontalLayout", "SidebarLayout"].find(value => value === localStorage.getItem("layout")) ??
    "SidebarLayout") as LayoutVariant,
);

effect(() => {
  localStorage.setItem("layout", sigLayout.value);
});
