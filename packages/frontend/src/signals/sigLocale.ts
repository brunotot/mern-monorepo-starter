import { effect, signal } from "@preact/signals-react";
import { i18n } from "@org/frontend/setup/i18n.setup";
import { type Locale } from "@org/frontend/config/i18n.config";

export const sigLocale = signal<Locale>(
  (["en", "hr"].find(value => value === localStorage.getItem("locale")) ?? "en") as Locale,
);

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => localStorage.setItem("locale", value));
});
