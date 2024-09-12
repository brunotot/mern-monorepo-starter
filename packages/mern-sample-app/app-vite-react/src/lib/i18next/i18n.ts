import i18n, { type TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export type I18nTranslateFn = TFunction<"translation", undefined>;

export const LANGUAGE_LIST = ["en", "hr"] as const satisfies string[];

export type I18nLocale = (typeof LANGUAGE_LIST)[number];

export const I18N_DEFAULT_LANGUAGE: I18nLocale = "en";

export async function changeLanguage(language: string) {
  return await i18n.changeLanguage(language);
}

export function initI18n() {
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
}
