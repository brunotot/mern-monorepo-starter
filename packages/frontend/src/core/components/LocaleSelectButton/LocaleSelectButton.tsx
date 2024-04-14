import { Translate } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Locale } from "../../config";
import { useLocalizationContext } from "../../hooks/useLocalizationContext";
import { IconButtonSelect } from "../IconButtonSelect/IconButtonSelect";

function getLocaleNativeName(locale: Locale) {
  const name: string = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(locale)!;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function LocaleSelectButton() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocalizationContext();

  return (
    <IconButtonSelect<Locale>
      value={locale}
      tooltip={t("systemLanguage")}
      items={["en", "hr"]}
      renderEmpty={() => <Translate />}
      renderButton={(item) => <Typography>{item.toUpperCase()}</Typography>}
      mapToValue={(item) => item}
      mapToKey={(item) => item}
      onChange={(locale) => setLocale(locale)}
      renderOption={(item: Locale) => getLocaleNativeName(item)}
    />
  );
}
