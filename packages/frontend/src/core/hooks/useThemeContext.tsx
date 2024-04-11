import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as MuiThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { ReactNode, createContext, useState } from "react";
import { $AppConfig } from "../config";
import { MuiTheme } from "../config/vars/muiTheme";
import { makeContextHook } from "./makeContextHook";

export type ThemeContextValue = {
  theme: MuiTheme;
  setTheme: (theme: MuiTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = makeContextHook(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, _setTheme] = useState<MuiTheme>($AppConfig.muiTheme);

  const setTheme = (diff: Partial<MuiTheme>) => {
    _setTheme((prev) => ({ ...prev, ...diff }));
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <>{children}</>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
}
