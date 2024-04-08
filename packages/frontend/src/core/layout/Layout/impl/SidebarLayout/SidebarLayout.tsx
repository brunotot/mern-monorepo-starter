import { Box } from "@mui/material";
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
    <Box display="flex" flexDirection="column">
      <Sidebar
        width={sidebarWidth}
        open={matchesDesktop || sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Box
        marginLeft={matchesDesktop ? `${sidebarWidth}px` : undefined}
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        gap={4}
      >
        <Header />

        {children}
      </Box>
    </Box>
  );
}
