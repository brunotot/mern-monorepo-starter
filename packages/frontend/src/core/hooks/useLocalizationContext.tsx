import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext } from "react";
import { $AppConfig, Locale } from "../config";
import { makeContextHook } from "./makeContextHook";

export type LocalizationContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
};

const LocalizationContext = createContext<LocalizationContextValue | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalizationContext = makeContextHook(LocalizationContext);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setStorageLocale] = useLocalStorage<Locale>("locale", "en");

  const setLocale = async (locale: Locale) => {
    await $AppConfig.i18n.changeLanguage(locale);
    setStorageLocale(locale);
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
}
