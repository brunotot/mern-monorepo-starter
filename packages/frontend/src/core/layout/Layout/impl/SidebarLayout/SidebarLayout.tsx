import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSidebarContext } from "../../../../hooks/useSidebarContext";
import { LayoutRendererProps } from "../../LayoutRenderer";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar";

export function SidebarLayout({ children }: LayoutRendererProps) {
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
      >
        <Header sx={{ paddingTop: 1.5 }} />

        {children}
      </Box>
    </Container>
  );
}
