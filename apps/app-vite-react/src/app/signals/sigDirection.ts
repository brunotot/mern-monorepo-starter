import { sigLocale } from "@org/app-vite-react/app/signals/sigLocale";
import * as i18n from "@org/app-vite-react/lib/i18next";
import { computed } from "@preact/signals-react";

export const sigDirection = computed<i18n.I18nDirection>(() => {
  return i18n.getDirection(sigLocale.value);
});
