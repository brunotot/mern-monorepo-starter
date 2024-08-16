import { PropsWithChildren } from "react";
import { Experimental_CssVarsProvider as MuiThemeProvider } from "@mui/material/styles";
import { ReactApp } from "../../../init";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MuiThemeProvider theme={ReactApp.getInstance().signals.theme.value}>
      {children}
    </MuiThemeProvider>
  );
}
