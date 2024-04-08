import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@uidotdev/usehooks";
import { LayoutProps } from "../../Layout";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar";
import { useSidebarContext } from "./useSidebarContext";

export function SidebarLayout({ children }: LayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const sidebarWidth = 300;

  return (
    <Container maxWidth="xl" sx={{ display: "flex", height: "100%" }}>
      <Sidebar
        width={sidebarWidth}
        open={matchesDesktop || sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Box
        //marginLeft={matchesDesktop ? `${sidebarWidth}px` : undefined}
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        //paddingBlock="0.75rem"
        gap={4}
      >
        <Header />

        {children}
      </Box>
    </Container>
  );
}
