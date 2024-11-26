import type { PropsWithChildren } from "react";

import { Box, type Breakpoint, Container, useMediaQuery } from "@mui/material";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Logo } from "@/app/components/Logo";
import { Sidebar } from "@/app/components/Sidebar";
import { sigLayoutVariant } from "@/app/signals/sigLayoutVariant";
import { sigLayoutWidth } from "@/app/signals/sigLayoutWidth";
import { sigSidebarOpen } from "@/app/signals/sigSidebarOpen";
import { type NavigationRoute } from "@/server/route-typings";

import { HorizontalLayout } from "./HorizontalLayout";
import { SidebarLayout } from "./SidebarLayout";

// eslint-disable-next-line react-refresh/only-export-components
export function isAnyRouteActive(children: NavigationRoute[]): boolean {
  return children.some(child => {
    if ("children" in child) {
      return isAnyRouteActive(child.children as NavigationRoute[]);
    }
    return location.pathname === child.path;
  });
}

export function Layout({ children }: PropsWithChildren) {
  const layoutWidth = sigLayoutWidth.value;
  const layoutWidthMatchesBelowMd = layoutWidth === "xs" || layoutWidth === "sm";
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const matchesTablet = useMediaQuery("(max-width:900px)");
  const layout = sigLayoutVariant.value;
  const isHorizontal =
    (matchesDesktop && (layout === "HorizontalLayout" || matchesTablet)) ||
    layoutWidthMatchesBelowMd;
  const sidebarOpen = sigSidebarOpen.value;
  const sidebarWidth = 300;

  // TODO: Maybe in the future? const maxWidthPreference = sigPreferences.value.containerWidth;
  const maxWidthPreference: Breakpoint | false = sigLayoutWidth.value;

  const SidebarComponent = (
    <Sidebar
      hidden={isHorizontal}
      width={sidebarWidth}
      open={matchesDesktop || sidebarOpen}
      onClose={() => (sigSidebarOpen.value = false)}
      onOpen={() => (sigSidebarOpen.value = true)}
    >
      <Box paddingInline="1.5rem">
        <Logo />
        <SidebarLayout gutterTop />
      </Box>
    </Sidebar>
  );

  return (
    <>
      <Container
        maxWidth={isHorizontal ? false : maxWidthPreference}
        sx={{
          display: "flex",
          height: "100%",
          paddingInline: "0 !important",
        }}
      >
        {SidebarComponent}

        <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
          <Header
            maxWidth={isHorizontal ? maxWidthPreference : false}
            backgroundColor={isHorizontal ? "var(--mui-palette-background-paper)" : undefined}
            borderBottom={isHorizontal}
            sx={{ padding: 1.5 }}
          />

          <HorizontalLayout
            hidden={!isHorizontal || !matchesDesktop}
            maxWidth={isHorizontal ? maxWidthPreference : false}
            backgroundColor={isHorizontal ? "var(--mui-palette-background-paper)" : undefined}
          />
          <Container
            data-driver="content"
            maxWidth={isHorizontal ? maxWidthPreference : false}
            sx={{ paddingInline: 0.5, marginTop: 1.5 }}
          >
            {children}
          </Container>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
