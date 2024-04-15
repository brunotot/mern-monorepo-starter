import { effect, signal } from "@preact/signals-react";
import { i18n } from "../config";

export type Locale = "hr" | "en";

export const sigLocale = signal<Locale>(
  (["en", "hr"].find((value) => value === localStorage.getItem("locale")) ??
    "en") as Locale
);

effect(async () => {
  await i18n.changeLanguage(sigLocale.value);
  localStorage.setItem("locale", sigLocale.value);
});
