import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { ReactNode, createContext, useState } from "react";
import { $AppConfig } from "../config";
import { MuiTheme } from "../config/vars/muiTheme";
import { makeContextHook } from "./makeContextHook";

export type ThemeContextValue = {
  theme: MuiTheme;
  setTheme: (theme: MuiTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const useThemeContext = makeContextHook(ThemeContext);

export default function ThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, _setTheme] = useState<MuiTheme>($AppConfig.muiTheme);

  const setTheme = (diff: Partial<MuiTheme>) => {
    _setTheme((prev) => ({ ...prev, ...diff }));
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <>{children}</>
        </ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
}
