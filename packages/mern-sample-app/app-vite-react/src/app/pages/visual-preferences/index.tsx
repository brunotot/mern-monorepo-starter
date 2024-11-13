import type { LayoutWidth, Locale } from "@org/app-vite-react/app/models";

import * as mui from "@mui/material";
import * as inputs from "@org/app-vite-react/app/forms/input";
import { sigLayoutVariant } from "@org/app-vite-react/app/signals/sigLayoutVariant";
import {
  LAYOUT_WIDTH_OPTIONS,
  sigLayoutWidth,
} from "@org/app-vite-react/app/signals/sigLayoutWidth";
import { sigLocale } from "@org/app-vite-react/app/signals/sigLocale";
import { sigThemeOpts } from "@org/app-vite-react/app/signals/sigTheme";
import { I18N_LANGUAGE_LIST } from "@org/app-vite-react/lib/i18next";

import { LabelInputGroup } from "./LabelInputGroup";
import { Flag } from "../../components/Flag/Flag";
import { getLocaleNativeName } from "../../inputs/InputLocaleSelect";

export default function VisualPreferencesPage() {
  return (
    <mui.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <LabelInputGroup label="Language">
        <inputs.InputSelect
          controlled
          value={sigLocale.value}
          options={I18N_LANGUAGE_LIST}
          onChange={locale => (sigLocale.value = locale)}
          getOptionLabel={locale => getLocaleNativeName(locale)}
          startAdornment={
            <mui.InputAdornment sx={{ marginInline: "0.5rem" }} position="start">
              <Flag locale={sigLocale.value} />
            </mui.InputAdornment>
          }
          renderOption={(locale: Locale) => (
            <mui.Box display="flex" alignItems="center" gap={1}>
              <Flag locale={locale} />
              <mui.Box component="span">{getLocaleNativeName(locale)}</mui.Box>
            </mui.Box>
          )}
        />
      </LabelInputGroup>

      <LabelInputGroup label="Layout Width">
        <inputs.InputSelect
          controlled
          value={sigLayoutWidth.value}
          options={LAYOUT_WIDTH_OPTIONS}
          onChange={layoutWidth => (sigLayoutWidth.value = layoutWidth)}
          getOptionLabel={(option: LayoutWidth) => (option === false ? "No width" : option)}
          renderOption={(option: LayoutWidth) => <>{option === false ? "No width" : option}</>}
        />
      </LabelInputGroup>

      <LabelInputGroup label="Layout Variant">
        <inputs.InputToggle
          controlled
          options={["HorizontalLayout", "SidebarLayout"]}
          value={sigLayoutVariant.value}
          onChange={layoutVariant => (sigLayoutVariant.value = layoutVariant)}
          renderOption={option => <>{option.includes("Horizontal") ? "Horizontal" : "Sidebar"}</>}
        />
      </LabelInputGroup>

      <LabelInputGroup label="Theme">
        <inputs.InputToggle
          controlled
          value={sigThemeOpts.value.dark ? "Dark" : "Light"}
          options={["Light", "Dark"]}
          onChange={theme =>
            (sigThemeOpts.value = { ...sigThemeOpts.value, dark: theme === "Dark" })
          }
        />
      </LabelInputGroup>
    </mui.Box>
  );
}
