import { Box, Container } from "@mui/material";
import { LayoutProps } from "../../Layout";
import { Header } from "../../shared/Header";
import { HorizontalNavigation } from "./HorizontalNavigation";

export function HorizontalLayout({ children }: LayoutProps) {
  // const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  // const matchesDesktop = useMediaQuery("(min-width:678px)");
  // const sidebarWidth = 300;

  return (
    <>
      <Box display="flex" flexDirection="column" boxShadow={2}>
        <Header
          borderBottom
          maxWidth="xl"
          backgroundColor="var(--mui-palette-background-paper)"
          sx={{ paddingBlock: 1.5 }}
        />
        <HorizontalNavigation
          maxWidth="xl"
          backgroundColor="var(--mui-palette-background-paper)"
        />
      </Box>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        {/*<Sidebar
        width={sidebarWidth}
        open={matchesDesktop || sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />*/}

        <Box
          //marginLeft={matchesDesktop ? `${sidebarWidth}px` : undefined}
          component="main"
          display="flex"
          flexDirection="column"
          flexGrow={1}
          //paddingBlock="0.75rem"
          gap={4}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
