import type { LayoutWidth, Locale } from "@org/app-vite-react/models";

import * as mui from "@mui/material";
import { sigLayoutVariant } from "@org/app-vite-react/signals/sigLayoutVariant";
import { sigLayoutWidth } from "@org/app-vite-react/signals/sigLayoutWidth";
import { sigLocale } from "@org/app-vite-react/signals/sigLocale";
import { sigSidebarPosition } from "@org/app-vite-react/signals/sigSidebarPosition";
import { sigThemeOpts } from "@org/app-vite-react/signals/sigTheme";
import * as React from "react";

import { LabelInputGroup } from "./LabelInputGroup";
import { Flag } from "../../components/Flag/Flag";
import { getLocaleNativeName } from "../../inputs/InputLocaleSelect";

export default function VisualPreferencesPage() {
  const options: LayoutWidth[] = [false, "sm", "md", "lg", "xl"];

  const [inputValue, setInputValue] = React.useState("");

  const handleLayoutVariantChange = (
    _event: React.MouseEvent<HTMLElement>,
    newVariant: "HorizontalLayout" | "SidebarLayout" | null,
  ) => {
    if (newVariant !== null) {
      sigLayoutVariant.value = newVariant;
      // Update your state management or signals here if needed
    }
  };

  const handleThemeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTheme: "Dark" | "Light" | null,
  ) => {
    if (newTheme !== null) {
      sigThemeOpts.value = { ...sigThemeOpts.value, dark: newTheme === "Dark" };
      // Update your state management or signals here if needed
    }
  };

  const handleSidebarPositionChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSidebarPosition: "left" | "right" | null,
  ) => {
    if (newSidebarPosition !== null) {
      sigSidebarPosition.value = newSidebarPosition;
      // Update your state management or signals here if needed
    }
  };

  const handleLanguageChange = (event: mui.SelectChangeEvent) => {
    sigLocale.value = event.target.value as Locale;
    // Update your state management or signals here if needed
  };

  return (
    <mui.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Language Select */}
      <LabelInputGroup label="Language">
        <mui.Select
          labelId="language-select-label"
          id="language-select"
          value={sigLocale.value}
          onChange={handleLanguageChange}
          label={undefined}
        >
          <mui.MenuItem value="en">
            <mui.Box display="flex" alignItems="center" gap={1}>
              <Flag locale={"en"} />
              <mui.Box component="span">{getLocaleNativeName("en")}</mui.Box>
            </mui.Box>
          </mui.MenuItem>
          <mui.MenuItem value="hr">
            <mui.Box display="flex" alignItems="center" gap={1}>
              <Flag locale={"hr"} />
              <mui.Box component="span">{getLocaleNativeName("hr")}</mui.Box>
            </mui.Box>
          </mui.MenuItem>
        </mui.Select>
      </LabelInputGroup>

      {/* Layout Width Autocomplete */}
      <LabelInputGroup label="Layout Width">
        <mui.Autocomplete<LayoutWidth>
          value={sigLayoutWidth.value}
          onChange={(_event, newValue) => {
            sigLayoutWidth.value = newValue!;
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: "100%" }}
          getOptionLabel={option => (option === false ? "No width" : option)}
          renderOption={(props, option) => {
            return <mui.ListItem {...props}>{option === false ? "No width" : option}</mui.ListItem>;
          }}
          renderInput={params => <mui.TextField {...params} />}
        />
      </LabelInputGroup>

      {/* Layout Variant ToggleButtonGroup */}
      <LabelInputGroup label="Layout Variant">
        <mui.ToggleButtonGroup
          value={sigLayoutVariant.value}
          exclusive
          onChange={handleLayoutVariantChange}
          sx={{
            width: "100%",
          }}
        >
          <mui.ToggleButton
            value="HorizontalLayout"
            aria-label="Horizontal Layout"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Horizontal
          </mui.ToggleButton>
          <mui.ToggleButton
            value="SidebarLayout"
            aria-label="Sidebar Layout"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Sidebar
          </mui.ToggleButton>
        </mui.ToggleButtonGroup>
      </LabelInputGroup>

      {/* Theme ToggleButtonGroup */}
      <LabelInputGroup label="Theme">
        <mui.ToggleButtonGroup
          value={sigThemeOpts.value.dark ? "Dark" : "Light"}
          exclusive
          onChange={handleThemeChange}
          aria-label="Theme"
          sx={{
            width: "100%",
          }}
        >
          <mui.ToggleButton
            value="Light"
            aria-label="Light Theme"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Light
          </mui.ToggleButton>
          <mui.ToggleButton
            value="Dark"
            aria-label="Dark Theme"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Dark
          </mui.ToggleButton>
        </mui.ToggleButtonGroup>
      </LabelInputGroup>

      {/* Sidebar position ToggleButtonGroup */}
      <LabelInputGroup label="Sidebar position">
        <mui.ToggleButtonGroup
          value={sigSidebarPosition.value}
          exclusive
          onChange={handleSidebarPositionChange}
          aria-label="Sidebar position"
          sx={{
            width: "100%",
          }}
        >
          <mui.ToggleButton
            value="left"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Left
          </mui.ToggleButton>
          <mui.ToggleButton
            value="right"
            sx={{
              flex: 1,
              borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
            }}
          >
            Right
          </mui.ToggleButton>
        </mui.ToggleButtonGroup>
      </LabelInputGroup>
    </mui.Box>
  );
}
