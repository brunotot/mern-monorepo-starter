import { Translate } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Locale, sigLocale } from "../../../signals";
import { InputIconButtonSelect } from "../InputIconButtonSelect/InputIconButtonSelect";

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
      renderButton={(item) => <Typography>{item.toUpperCase()}</Typography>}
      mapToValue={(item) => item}
      mapToKey={(item) => item}
      onChange={(locale) => (sigLocale.value = locale)}
      renderOption={(item: Locale) => getLocaleNativeName(item)}
    />
  );
}
