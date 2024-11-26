import type { Locale } from "../models";

import * as i18n from "@/lib/i18next";
import { effect, signal } from "@preact/signals-react";

import { LocalStorage } from "../../server/LocalStorage";

export const sigLocale = signal<Locale>(LocalStorage.get("locale", i18n.I18N_DEFAULT_LANGUAGE));

const FONT_MAPPING: Partial<Record<Locale, string>> = {
  en: '"DM Sans", sans-serif',
  ar: '"Noto Sans Arabic", serif',
};

export function getFontFamily(locale: Locale) {
  return FONT_MAPPING[locale] ?? FONT_MAPPING.en;
}

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => {
    LocalStorage.set("locale", value);
  });
});
