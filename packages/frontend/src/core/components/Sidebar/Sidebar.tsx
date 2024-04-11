import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { SidebarNavigation } from "../../layout";
import { Logo } from "../Logo";

export type SidebarProps = {
  width?: number;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export function Sidebar({ width = 300, open, onClose, onOpen }: SidebarProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const computedAnchor = matchesDesktop ? "left" : "bottom";
  const computedWidth = matchesDesktop ? width : "100%";

  return (
    <SwipeableDrawer
      open={open}
      anchor={computedAnchor}
      onOpen={onOpen}
      onClose={onClose}
      variant={matchesDesktop ? "permanent" : "temporary"}
      sx={{
        width: computedWidth,
        position: matchesDesktop ? "relative" : undefined,
        "& .MuiDrawer-paper": {
          width: computedWidth,
          position: matchesDesktop ? "absolute" : undefined, //imp
        },
      }}
    >
      <Logo />
      <SidebarNavigation />
    </SwipeableDrawer>
  );
}
