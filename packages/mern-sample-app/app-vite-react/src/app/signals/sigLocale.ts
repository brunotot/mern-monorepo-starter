import type { Locale } from "../models";

import * as i18n from "@org/app-vite-react/lib/i18next";
import { effect, signal } from "@preact/signals-react";

import { LocalStorage } from "../../server/LocalStorage";

export const sigLocale = signal<Locale>(LocalStorage.get("locale", i18n.I18N_DEFAULT_LANGUAGE));

effect(() => {
  const value = sigLocale.value;
  i18n.changeLanguage(value).then(() => LocalStorage.set("locale", value));
});
