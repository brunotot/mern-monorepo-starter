import { Box, Container, useMediaQuery } from "@mui/material";
import { Sidebar } from "../../../components";
import { Header } from "../../../components/Header";
import { useSidebarContext } from "../../../hooks";
import { LayoutRendererProps } from "../../LayoutRenderer";
import { HorizontalNavigation } from "./HorizontalNavigation";

export function HorizontalLayout({ children }: LayoutRendererProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  const matchesDesktop = useMediaQuery("(min-width:678px)");

  return (
    <>
      <Sidebar
        open={matchesDesktop ? false : sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />
      <Box display="flex" flexDirection="column" boxShadow={2}>
        <Header
          borderBottom
          maxWidth="xl"
          backgroundColor="var(--mui-palette-background-paper)"
          sx={{ paddingBlock: 1.5 }}
        />
        {matchesDesktop && (
          <HorizontalNavigation
            maxWidth="xl"
            backgroundColor="var(--mui-palette-background-paper)"
          />
        )}
      </Box>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          flexGrow={1}
          gap={4}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
