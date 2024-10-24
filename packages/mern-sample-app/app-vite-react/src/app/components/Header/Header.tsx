import type { Breakpoint, SxProps, Theme } from "@mui/material";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { InputDarkThemeToggle } from "@org/app-vite-react/app/inputs/InputDarkThemeToggle";
import { InputLayoutToggle } from "@org/app-vite-react/app/inputs/InputLayoutToggle";
import { InputLocaleSelect } from "@org/app-vite-react/app/inputs/InputLocaleSelect";
import { sigLayout } from "@org/app-vite-react/signals/sigLayout";
import { sigLocale } from "@org/app-vite-react/signals/sigLocale";
import { sigSidebarOpen } from "@org/app-vite-react/signals/sigSidebarOpen";
import { sigThemeOpts } from "@org/app-vite-react/signals/sigTheme";

import { UserMenuButton } from "./UserMenuButton";
import { Logo } from "../Logo";
import { ComputedBreadcrumbs } from "./ComputedBreadcrumbs";

export type MuiSxProps = SxProps<Theme>;

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
  sx?: MuiSxProps;
};

export function Header({
  //backgroundColor,
  maxWidth = false,
  borderBottom = false,
  sx,
}: HeaderProps) {
  const matchesDesktop = mui.useMediaQuery("(min-width:678px)");
  const matchesTablet = mui.useMediaQuery("(max-width:900px)");
  const matchesAboveDesktop = mui.useMediaQuery("(min-width:900px)");

  return (
    <mui.Box
      component="header"
      sx={{
        borderBottom: borderBottom ? "1px solid var(--mui-palette-divider)" : undefined,
        position: "sticky",
        top: 0,
        zIndex: 1199,
        background: "var(--mui-palette-background-paper)",
      }}
    >
      <mui.Container maxWidth={maxWidth} sx={{ paddingInline: "0 !important" }}>
        <mui.Box display="flex" alignItems="center" paddingInline={0} gap={1} sx={sx}>
          {!matchesDesktop && (
            <mui.IconButton onClick={() => (sigSidebarOpen.value = !sigSidebarOpen.value)}>
              <icons.Menu />
            </mui.IconButton>
          )}

          <mui.Box flexGrow={1}>
            <mui.Box display="flex" alignItems="center" gap={2}>
              {((matchesAboveDesktop && sigLayout.value === "HorizontalLayout") ||
                (matchesDesktop && matchesTablet)) && (
                <>
                  <Logo hideText={matchesTablet} />
                  <mui.Divider orientation="vertical" sx={{ height: 48 }} />
                </>
              )}
              <mui.Box
                ml={
                  matchesDesktop && sigLayout.value === "SidebarLayout" && matchesAboveDesktop
                    ? 2
                    : undefined
                }
              >
                <ComputedBreadcrumbs />
              </mui.Box>
            </mui.Box>
          </mui.Box>

          <mui.Box display="flex" alignItems="center" columnGap={matchesDesktop ? 2 : undefined}>
            <mui.Box display="flex" alignItems="center">
              {matchesDesktop && !matchesTablet && (
                <InputLayoutToggle
                  value={sigLayout.value}
                  onChange={layout => (sigLayout.value = layout)}
                />
              )}
              <InputDarkThemeToggle
                value={!!sigThemeOpts.value?.dark}
                onChange={dark => (sigThemeOpts.value = { dark })}
              />
              <InputLocaleSelect
                value={sigLocale.value}
                onChange={locale => (sigLocale.value = locale)}
              />
            </mui.Box>
            <UserMenuButton />
          </mui.Box>
        </mui.Box>
      </mui.Container>
    </mui.Box>
  );
}
