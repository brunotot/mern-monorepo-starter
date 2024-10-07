import { createTheme } from "@mui/material";
import { computed, effect, signal } from "@preact/signals-react";

type ThemeOptsInternal = NonNullable<Parameters<typeof createTheme>[0]>;

type ThemeOptsBase = Omit<ThemeOptsInternal, "cssVariables" | "colorSchemes">;

/** @hidden */
export type ThemeOpts = ThemeOptsBase & {
  dark: boolean;
};

/**
 * A signal for MUI's theme options.
 *
 * @remarks Components or hooks subscribing to this signal will automatically re-render or react when its value changes.
 *
 * @see {@link https://mui.com/material-ui/customization/default-theme/ | MUI's default theme options}
 *
 * @default
 * ```ts
 * { dark: localStorage.getItem("dark") OR window.matchMedia("(prefers-color-scheme: dark)").matches }
 * ```
 *
 * @example
 * ```ts
 * import { sigThemeOpts } from './path-to-sigThemeOpts';
 * const currentValue = sigThemeOpts.value // Read
 * sigThemeOpts.value = { dark: false } // Write
 * ```
 */
export const sigThemeOpts = signal<ThemeOpts>({
  dark:
    localStorage.getItem("dark") !== undefined
      ? localStorage.getItem("dark") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
});

effect(() => {
  const value = sigThemeOpts.value.dark;
  localStorage.setItem("dark", `${value}`);
});

/**
 * A readonly signal for MUI's theme (computed from {@link sigThemeOpts}).
 *
 * @remarks Components or hooks subscribing to this signal will automatically re-render or react when its value changes.
 *
 * @see {@link https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme | MUI's createTheme API Documentation}
 *
 * @example
 * ```ts
 * import { sigTheme } from './path-to-sigTheme';
 * const currentValue = sigTheme.value // Read
 * ```
 */
export const sigTheme = computed(() => {
  const { dark, ...rest } = sigThemeOpts.value;

  return createTheme({
    ...rest,
    shape: {
      borderRadius: rest.shape?.borderRadius ?? 12,
    },
    typography: {
      ...rest.typography,
      fontFamily: '"DM Sans", sans-serif',
      allVariants: {
        fontOpticalSizing: "auto",
      },
    },
    cssVariables: true,
    colorSchemes: {
      [dark ? "dark" : "light"]: true,
    },
  });
});
