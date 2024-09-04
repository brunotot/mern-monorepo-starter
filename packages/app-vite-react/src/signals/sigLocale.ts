import { effect, signal } from "@preact/signals-react";
import { type Locale } from "@org/app-vite-react/lib/i18next";
import i18n from "i18next";

export const sigLocale = signal<Locale>(
  (["en", "hr"].find(value => value === localStorage.getItem("locale")) ?? "en") as Locale,
);

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => localStorage.setItem("locale", value));
});
