import { Translate } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { InputIconButtonSelect } from "@org/app-vite-react/components/inputs/InputIconButtonSelect/InputIconButtonSelect";
import { sigLocale } from "@org/app-vite-react/signals/sigLocale";
import type { Locale } from "@org/app-vite-react/config/i18n.config";

function getLocaleNativeName(locale: Locale) {
  const name: string = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(locale)!;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function InputLocaleSelect() {
  const { t } = useTranslation();

  return (
    <InputIconButtonSelect<Locale>
      value={sigLocale.value}
      tooltip={t("systemLanguage")}
      items={["en", "hr"]}
      renderEmpty={() => <Translate />}
      renderButton={item => <Typography>{item.toUpperCase()}</Typography>}
      mapToValue={item => item}
      mapToKey={item => item}
      onChange={locale => (sigLocale.value = locale)}
      renderOption={(item: Locale) => getLocaleNativeName(item)}
    />
  );
}
