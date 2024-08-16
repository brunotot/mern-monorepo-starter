import {
  CssVarsTheme,
  PaletteMode,
  PaletteOptions,
  ThemeOptions,
  TypeBackground,
  PaletteColorOptions,
} from "@mui/material";
import {
  Theme,
  experimental_extendTheme as extendTheme,
  createTheme as muiCreateTheme,
} from "@mui/material/styles";
import { darken, lighten, alpha } from "@mui/material/styles";
import { ColorPartial, TypeText } from "@mui/material/styles/createPalette";

export type MuiThemeValue = Omit<Theme, "palette" | "applyStyles"> & CssVarsTheme;

export type MuiThemeConfig = {
  colors: MuiThemeColors;
  config: Omit<ThemeOptions, "palette">;
};

export type MuiThemeColors = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

export function createTheme({ colors, config }: MuiThemeConfig): MuiThemeValue {
  const theme = muiCreateTheme();
  //return extendTheme(theme);
  return extendTheme(theme, {
    ...config,
    colorSchemes: {
      dark: { palette: buildBasePalette(theme, colors, "dark") },
      light: { palette: buildBasePalette(theme, colors, "light") },
    },
  });
}

function buildContrastColor(mode: PaletteMode, color: string, coefficient: number): string {
  return mode === "light" ? lighten(color, coefficient) : darken(color, coefficient);
}

function buildBackgroundColor(mode: PaletteMode): Partial<TypeBackground> {
  return {
    paper: mode === "dark" ? "#1d1d1d" : "#F4F5FA",
    default: mode === "dark" ? "#121212" : "#F4F5FA",
  };
}

function buildGreyColor(greyBaseColor: string): ColorPartial {
  return {
    50: lighten(greyBaseColor, 0.8),
    100: lighten(greyBaseColor, 0.6),
    200: lighten(greyBaseColor, 0.4),
    300: lighten(greyBaseColor, 0.2),
    400: greyBaseColor,
    500: darken(greyBaseColor, 0.1),
    600: darken(greyBaseColor, 0.2),
    700: darken(greyBaseColor, 0.3),
    800: darken(greyBaseColor, 0.4),
    900: darken(greyBaseColor, 0.5),
    A100: lighten(greyBaseColor, 0.7),
    A200: lighten(greyBaseColor, 0.5),
    A400: darken(greyBaseColor, 0.3),
    A700: darken(greyBaseColor, 0.4),
  };
}

function buildTextColor(
  _theme: Theme,
  _primaryColor: string,
  _secondaryColor: string,
  mode: PaletteMode,
): Partial<TypeText> {
  //const augmentedPrimary = theme.palette.augmentColor({ color: { main: primaryColor } });
  //const augmentedSecondary = theme.palette.augmentColor({ color: { main: secondaryColor } });

  //const primary = mode === "light" ? augmentedPrimary.dark : augmentedPrimary.light;
  //const secondary = mode === "light" ? augmentedSecondary.dark : augmentedSecondary.light;

  /*return {
    primary: getContrastText(primaryColor),
    secondary: getContrastText(secondaryColor),
  };*/
  return {
    primary: mode === "light" ? "#000" : "#fff",
    secondary: mode === "light" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
  };
}

function buildDividerColor(primaryColor: string): string {
  return alpha(primaryColor, 0.12);
}

function buildPaletteColor(main: string): PaletteColorOptions {
  return { main };
}

function buildBasePalette(theme: Theme, schema: MuiThemeColors, mode: PaletteMode): PaletteOptions {
  return {
    mode,
    primary: buildPaletteColor(schema.primary),
    secondary: buildPaletteColor(schema.secondary),
    success: buildPaletteColor(schema.success),
    warning: buildPaletteColor(schema.warning),
    error: buildPaletteColor(schema.error),
    info: buildPaletteColor(schema.info),
    grey: buildGreyColor(buildContrastColor(mode, schema.primary, 0.5)),
    text: buildTextColor(theme, schema.primary, schema.secondary, mode),
    divider: buildDividerColor(schema.primary),
    background: buildBackgroundColor(mode),
    // action: {},
  };
}
