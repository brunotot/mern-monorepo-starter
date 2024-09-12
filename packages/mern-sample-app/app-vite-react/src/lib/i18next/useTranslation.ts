import { useTranslation as useI18nTranslation } from "react-i18next";

export function useTranslation() {
  const { t } = useI18nTranslation();
  return t;
}
