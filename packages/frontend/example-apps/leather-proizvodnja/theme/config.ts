import { MuiThemeConfig } from "../../../src/core";

export default {
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
        //size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        //size: "small",
      },
    },
    MuiMenu: {
      defaultProps: {
        MenuListProps: { sx: { padding: "0 !important" } },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
        },
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
              //color: "var(--mui-palette-action-active)",
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
  },
} satisfies MuiThemeConfig["config"];
