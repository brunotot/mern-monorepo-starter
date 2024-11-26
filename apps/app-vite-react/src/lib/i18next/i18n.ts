import type { Direction } from "@mui/material";

import * as flags from "country-flag-icons/react/3x2";
import i18n, { type TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const I18N_LANGUAGE_LIST = ["en", "hr", "ar"] as const satisfies string[];

export const I18N_DEFAULT_LANGUAGE = "en" as const satisfies I18nLocale;

export type I18nTranslateFn = TFunction<"translation", undefined>;

export type I18nLocale = (typeof I18N_LANGUAGE_LIST)[number];

export type I18nDirection = Direction;

const LOCALE_FLAG_MAPPER = {
  en: "US",
  hr: "HR",
  ar: "SA",
} as const satisfies Record<I18nLocale, string>;

export async function changeLanguage(language: string) {
  return await i18n.changeLanguage(language);
}

export function getDirection(locale: I18nLocale) {
  return i18n.dir(locale);
}

export function getLocaleFlag(locale: I18nLocale) {
  return flags[LOCALE_FLAG_MAPPER[locale]];
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: I18N_DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
