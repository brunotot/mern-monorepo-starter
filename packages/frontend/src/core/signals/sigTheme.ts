import { PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";
import {
  CssVarsTheme,
  Theme,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { signal } from "@preact/signals-react";

export function buildBaseThemeConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _schema: MuiThemeColors
): Omit<ThemeOptions, "palette"> {
  return {
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: [
        "Inter",
        "sans-serif",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
      MuiButton: {
        defaultProps: {
          // size: "small",
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: "small",
        },
      },
      MuiMenu: {
        defaultProps: {
          MenuListProps: { sx: { padding: "0 !important" } },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: "0 !important",
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          enterDelay: 300,
          enterNextDelay: 300,
          TransitionProps: {
            timeout: 300,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            "&.MuiDivider-withChildren": {
              "& .MuiDivider-wrapper": {
                textTransform: "uppercase",
                color: "var(--mui-palette-action-active)",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "nowrap",
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "2.125rem",
          },
        },
      },
      MuiDrawer: {
        defaultProps: {
          sx: {
            flexShrink: 0,
          },
        },
        styleOverrides: {
          paper: {
            background: "var(--mui-palette-background-default)",
            borderWidth: 0,
            scrollbarGutter: "stable",
          },
        },
      },
      /*MuiSwipeableDrawer: {
        defaultProps: {
          sx: {
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              background: "var(--mui-palette-background-default)",
              borderWidth: 0,
              scrollbarGutter: "stable",
            },
          }
        },
      },*/
    },
  };
}

function buildBasePalette(
  schema: MuiThemeColors,
  mode: PaletteMode
): PaletteOptions {
  const lightColor = "58, 53, 65";
  const darkColor = "231, 227, 252";
  const mainColor = mode === "light" ? lightColor : darkColor;

  const buildPaletteColor = (color: string) => ({ main: color });
  return {
    mode,
    primary: buildPaletteColor(schema.primary),
    secondary: buildPaletteColor(schema.secondary),
    success: buildPaletteColor(schema.success),
    warning: buildPaletteColor(schema.warning),
    error: buildPaletteColor(schema.error),
    info: buildPaletteColor(schema.info),
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#D5D5D5",
      A200: "#AAAAAA",
      A400: "#616161",
      A700: "#303030",
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === "light" ? "#FFF" : "#312D4B",
      default: mode === "light" ? "#F4F5FA" : "#28243D",
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  };
}

export type MuiThemeConfig = {
  colors: MuiThemeColors;
};

export type MuiTheme = Omit<Theme, "palette" | "applyStyles"> & CssVarsTheme;

export type MuiThemeColors = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

function createTheme({ colors }: MuiThemeConfig) {
  return extendTheme({
    ...buildBaseThemeConfig(colors),
    colorSchemes: {
      dark: { palette: buildBasePalette(colors, "dark") },
      light: { palette: buildBasePalette(colors, "light") },
    },
  });
}

const VAR_MUI_THEME: MuiTheme = createTheme({
  colors: {
    primary: "#9155FD",
    secondary: "#8A8D93",
    success: "#56CA00",
    warning: "#FFB400",
    error: "#FF4C51",
    info: "#16B1FF",
  },
});

export const sigTheme = signal<MuiTheme>(VAR_MUI_THEME);
