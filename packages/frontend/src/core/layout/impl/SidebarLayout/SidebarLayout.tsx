import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useSidebarContext } from "../../../hooks";
import { LayoutRendererProps } from "../../LayoutRenderer";

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
        onOpen={() => setSidebarOpen(true)}
      />

      <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
        <Header sx={{ paddingTop: 1.5 }} />
        {children}
        <Footer />
      </Box>
    </Container>
  );
}
