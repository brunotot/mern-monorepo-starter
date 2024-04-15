import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

export type SidebarProps = {
  width?: number;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  hidden?: boolean;
  children: ReactNode;
};

export function Sidebar({
  hidden = false,
  width = 300,
  open,
  onClose,
  onOpen,
  children,
}: SidebarProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const computedAnchor = matchesDesktop ? "left" : "bottom";

  const paperWidth = matchesDesktop ? width : "100%";
  const drawerWidth = hidden ? 0 : paperWidth;
  const drawerPosition = matchesDesktop ? "relative" : undefined;
  const paperPosition = matchesDesktop ? "absolute" : undefined;
  const drawerVariant = hidden
    ? "temporary"
    : matchesDesktop
    ? "permanent"
    : "temporary";

  const bottomPadding = 150;
  const paperMaxHeight = matchesDesktop
    ? undefined
    : `calc(100% - ${bottomPadding}px)`;
  const paperTop = matchesDesktop ? undefined : bottomPadding;

  return (
    <SwipeableDrawer
      open={!hidden && open}
      anchor={computedAnchor}
      onOpen={onOpen}
      onClose={onClose}
      variant={drawerVariant}
      sx={{
        width: drawerWidth,
        position: drawerPosition,
        "& .MuiDrawer-paper": {
          width: paperWidth,
          position: paperPosition,
          maxHeight: paperMaxHeight,
          top: paperTop,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
}
