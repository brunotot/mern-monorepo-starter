import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@mui/material";
import { sigTheme } from "@/app/signals/sigTheme";

export function MuiThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={sigTheme.value}>{children}</ThemeProvider>;
}
