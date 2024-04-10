import { Drawer, useMediaQuery } from "@mui/material";
import { SidebarNavContent } from "../../impl/SidebarLayout/SidebarNavContent";
import { SidebarNavLogo } from "./components/SidebarNavLogo";

export type SidebarProps = {
  width?: number;
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ width = 300, open, onClose }: SidebarProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={matchesDesktop ? "permanent" : "temporary"}
      sx={{
        width,
        flexShrink: 0,
        position: matchesDesktop ? "relative" : undefined, //imp
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          background: "var(--mui-palette-background-default)",
          borderWidth: 0,
          scrollbarGutter: "stable",
          position: matchesDesktop ? "absolute" : undefined, //imp
        },
      }}
    >
      <SidebarNavLogo />
      <SidebarNavContent />
    </Drawer>
  );
}
