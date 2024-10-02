import i18n, { type TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const I18N_LANGUAGE_LIST = ["en", "hr"] as const satisfies string[];

export const I18N_DEFAULT_LANGUAGE = "en" as const satisfies I18nLocale;

export type I18nTranslateFn = TFunction<"translation", undefined>;

export type I18nLocale = (typeof I18N_LANGUAGE_LIST)[number];

export async function changeLanguage(language: string) {
  return await i18n.changeLanguage(language);
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
