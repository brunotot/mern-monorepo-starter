import type { PropsWithChildren } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { sigTheme } from "@org/app-vite-react/signals/sigTheme";

export function ThemeProvider({ children }: PropsWithChildren) {
  return <MuiThemeProvider theme={sigTheme.value}>{children}</MuiThemeProvider>;
}
