import type { I18nLocale } from "@/lib/i18next";

import { getLocaleFlag } from "@/lib/i18next";
import React from "react";

export type FlagProps = {
  locale: I18nLocale;
};

export function Flag({ locale }: FlagProps) {
  const FlagComponent = React.useMemo(() => getLocaleFlag(locale), [locale]);
  const width = 24;

  return <FlagComponent height={width} width={width} />;
}
