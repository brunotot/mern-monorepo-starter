import { Box, Container, useMediaQuery } from "@mui/material";
import { PropsWithChildren } from "react";
import { Logo } from "..";
import { sigLayout, sigPreferences, sigSidebarOpen } from "../../signals";
import { Sidebar } from "../navigation/Sidebar";
import { Footer, Header } from "../semantics";
import { HorizontalNavVariant, SidebarNavVariant } from "./variants";

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
            sx={{ paddingInline: isHorizontal ? undefined : "0 !important" }}
          >
            {children}
          </Container>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
