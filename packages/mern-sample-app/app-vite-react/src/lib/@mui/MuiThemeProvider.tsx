import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@mui/material";
import { sigTheme } from "@org/app-vite-react/signals/sigTheme";

export function MuiThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={sigTheme.value}>{children}</ThemeProvider>;
}
