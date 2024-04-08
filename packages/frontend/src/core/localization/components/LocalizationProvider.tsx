import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext } from "react";
import i18n from "../i18n";
import { Locale } from "../index";

export type LocalizationContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LocalizationContext = createContext<
  LocalizationContextValue | undefined
>(undefined);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setStorageLocale] = useLocalStorage<Locale>("locale", "en");

  const setLocale = async (locale: Locale) => {
    await i18n.changeLanguage(locale);
    setStorageLocale(locale);
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
}
