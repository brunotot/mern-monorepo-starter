import { effect, signal } from "@preact/signals-react";
import { i18n } from "@org/app-vite-react/setup/i18n.setup";
import { type Locale } from "@org/app-vite-react/config/i18n.config";

export const sigLocale = signal<Locale>(
  (["en", "hr"].find(value => value === localStorage.getItem("locale")) ?? "en") as Locale,
);

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => localStorage.setItem("locale", value));
});
