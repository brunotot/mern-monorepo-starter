import { Box, Container, useMediaQuery } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Sidebar } from "@org/app-vite-react/app/components/Sidebar";
import { Header } from "@org/app-vite-react/app/components/Header";
import { Footer } from "@org/app-vite-react/app/components/Footer";
import { sigLayout } from "@org/app-vite-react/signals/sigLayout";
import { sigSidebarOpen } from "@org/app-vite-react/signals/sigSidebarOpen";
import { Logo } from "@org/app-vite-react/app/components/Logo";
import { SidebarLayout } from "./SidebarLayout";
import { HorizontalLayout } from "./HorizontalLayout";
import { type NavigationRoute } from "@org/app-vite-react/route-typings";

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
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const layout = sigLayout.value;
  const isHorizontal = matchesDesktop && layout === "HorizontalLayout";
  const sidebarOpen = sigSidebarOpen.value;
  const sidebarWidth = 300;

  // TODO: Maybe in the future? const maxWidthPreference = sigPreferences.value.containerWidth;
  const maxWidthPreference = "xl";

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
        <Sidebar
          hidden={isHorizontal}
          width={sidebarWidth}
          open={matchesDesktop || sidebarOpen}
          onClose={() => (sigSidebarOpen.value = false)}
          onOpen={() => (sigSidebarOpen.value = true)}
        >
          <Logo />
          <SidebarLayout />
        </Sidebar>

        <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
          <Header
            maxWidth={isHorizontal ? maxWidthPreference : false}
            backgroundColor={isHorizontal ? "var(--mui-palette-background-paper)" : undefined}
            borderBottom={isHorizontal}
            sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}
          />

          <HorizontalLayout
            hidden={!isHorizontal || !matchesDesktop}
            maxWidth={isHorizontal ? maxWidthPreference : false}
            backgroundColor={isHorizontal ? "var(--mui-palette-background-paper)" : undefined}
          />
          <Container
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
