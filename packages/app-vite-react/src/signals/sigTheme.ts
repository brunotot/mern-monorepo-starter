import { createTheme } from "@mui/material";
import { computed, signal } from "@preact/signals-react";

const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

type ThemeOptsInternal = Parameters<typeof createTheme>[0];

type ThemeOptsBase = Omit<ThemeOptsInternal, "cssVariables" | "colorSchemes">;

export type ThemeOpts = ThemeOptsBase & {
  dark: boolean;
};

export const sigThemeOpts = signal<ThemeOpts>({ dark: userPrefersDarkMode });

export const sigTheme = computed(() => {
  const { dark, ...rest } = sigThemeOpts.value;

  return createTheme({
    ...rest,
    cssVariables: true,
    colorSchemes: {
      [dark ? "dark" : "light"]: true,
    },
  });
});
