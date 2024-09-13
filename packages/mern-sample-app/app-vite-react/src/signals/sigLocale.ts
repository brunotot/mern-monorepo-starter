import { effect, signal } from "@preact/signals-react";
import * as i18n from "@org/app-vite-react/lib/i18next";

export const sigLocale = signal<i18n.I18nLocale>(
  (i18n.I18N_LANGUAGE_LIST.find(value => value === localStorage.getItem("locale")) ??
    i18n.I18N_DEFAULT_LANGUAGE) as i18n.I18nLocale,
);

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => localStorage.setItem("locale", value));
});
