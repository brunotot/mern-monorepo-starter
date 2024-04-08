import { PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { ColorSchemaData, ColorSchemaName, ThemeColorSchema } from "./colors";

export function buildBaseThemeConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _schema: ThemeColorSchema
): Omit<ThemeOptions, "palette"> {
  return {
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
      // Override for TextField
      MuiTextField: {
        defaultProps: {
          size: "small", // Set default size to 'small'
        },
      },
      // Override for Button
      MuiButton: {
        defaultProps: {
          //size: "small", // Set default size to 'small'
        },
      },
      // Override for FormControl or components under FormControl like Select
      MuiFormControl: {
        defaultProps: {
          size: "small", // Set default size to 'small'
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
              },
            },
          },
        },
      },
    },
  };
}

export type ThemeCreatorConfig = {
  colorSchemaName: ColorSchemaName;
};

function buildBasePalette(
  schema: ThemeColorSchema,
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

export function createTheme(config: ThemeCreatorConfig) {
  const schema = ColorSchemaData[config.colorSchemaName];
  return extendTheme({
    ...buildBaseThemeConfig(schema),
    colorSchemes: {
      dark: { palette: buildBasePalette(schema, "dark") },
      light: { palette: buildBasePalette(schema, "light") },
    },
  });
}
