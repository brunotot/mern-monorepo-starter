import type { PropsWithChildren } from "react";
import { Experimental_CssVarsProvider as MuiThemeProvider } from "@mui/material/styles";
import { reactServer } from "@org/frontend/setup/reactServer.setup";

export function ThemeProvider({ children }: PropsWithChildren) {
  return <MuiThemeProvider theme={reactServer.signals.theme.value}>{children}</MuiThemeProvider>;
}
