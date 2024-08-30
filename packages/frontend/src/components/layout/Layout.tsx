import { Box, Container, useMediaQuery } from "@mui/material";
import { PropsWithChildren } from "react";
import { Sidebar } from "@org/frontend/components/navigation/Sidebar";
import { Footer, Header } from "@org/frontend/components/semantics";
import { HorizontalNavVariant, SidebarNavVariant } from "@org/frontend/components/layout/variants";
import { sigLayout } from "@org/frontend/signals/sigLayout";
import { sigPreferences } from "@org/frontend/signals/sigPreferences";
import { sigSidebarOpen } from "@org/frontend/signals/sigSidebarOpen";
import { Logo } from "@org/frontend/components/semantics/Logo";

export function Layout({ children }: PropsWithChildren) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const layout = sigLayout.value;
  const isHorizontal = matchesDesktop && layout === "HorizontalLayout";
  const sidebarOpen = sigSidebarOpen.value;
  const sidebarWidth = 300;
  const maxWidthPreference = sigPreferences.value.containerWidth;

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
          <SidebarNavVariant />
        </Sidebar>

        <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
          <Header
            maxWidth={isHorizontal ? maxWidthPreference : false}
            sx={{
              paddingTop: 1.5,
              paddingBottom: 1.5,
            }}
            backgroundColor={isHorizontal ? "var(--mui-palette-background-paper)" : undefined}
            borderBottom={isHorizontal}
          />

          <HorizontalNavVariant
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