import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@uidotdev/usehooks";
import { PropsWithChildren } from "react";
import { Logo } from "..";
import { useLayoutContext, useSidebarContext } from "../../hooks";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { HorizontalNavigation } from "./navigation/HorizontalNavigation";
import { SidebarNavigation } from "./navigation/SidebarNavigation";

export function Layout({ children }: PropsWithChildren) {
  const { layout } = useLayoutContext();
  const isHorizontal = layout === "HorizontalLayout";
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const sidebarWidth = 300;

  return (
    <>
      <Container
        maxWidth={isHorizontal ? false : "xl"}
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
          onClose={() => setSidebarOpen(false)}
          onOpen={() => setSidebarOpen(true)}
        >
          <Logo />
          <SidebarNavigation />
        </Sidebar>

        <Box
          component="main"
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Header
            maxWidth={isHorizontal ? "xl" : false}
            sx={{
              paddingTop: 1.5,
              paddingBottom: 1.5,
            }}
            backgroundColor={
              isHorizontal ? "var(--mui-palette-background-paper)" : undefined
            }
            borderBottom={isHorizontal}
          />

          <HorizontalNavigation
            hidden={!isHorizontal}
            paddingInline={0}
            maxWidth={isHorizontal ? "xl" : false}
            backgroundColor={
              isHorizontal ? "var(--mui-palette-background-paper)" : undefined
            }
          />
          <Container
            maxWidth={isHorizontal ? "xl" : false}
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
