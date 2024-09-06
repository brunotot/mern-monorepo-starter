import { createTheme } from "@mui/material";
import { computed, signal } from "@preact/signals-react";

type ThemeOptsInternal = Parameters<typeof createTheme>[0];

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
 * { dark: window.matchMedia("(prefers-color-scheme: dark)").matches }
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
  dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
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
    cssVariables: true,
    colorSchemes: {
      [dark ? "dark" : "light"]: true,
    },
  });
});
