import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext, useMemo } from "react";
import { makeContextHook } from "../hooks";
import { DEFAULT_COLOR_SCHEMA_NAME } from "../theme/colors";
import { ThemeCreatorConfig, createTheme } from "../theme/createTheme";

export type ThemeContextValue = {
  themeConfig: ThemeCreatorConfig;
  setThemeConfig: (themeConfig: Partial<ThemeCreatorConfig>) => void;
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
  const [themeConfig, _setThemeConfig] = useLocalStorage<ThemeCreatorConfig>(
    "themeConfig",
    {
      colorSchemaName: DEFAULT_COLOR_SCHEMA_NAME,
    }
  );

  const setThemeConfig = (themeConfig: Partial<ThemeCreatorConfig>) => {
    _setThemeConfig((prev) => ({ ...prev, ...themeConfig }));
  };

  const theme = useMemo(() => createTheme(themeConfig), [themeConfig]);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ themeConfig, setThemeConfig }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <>{children}</>
        </ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
}
