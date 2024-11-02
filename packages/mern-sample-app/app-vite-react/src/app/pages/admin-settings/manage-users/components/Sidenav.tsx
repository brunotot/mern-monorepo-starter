import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

export type SidenavProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export function Sidenav({ children, onClose, open }: SidenavProps) {
  const theme = mui.useTheme();
  return (
    <mui.Drawer
      sx={{
        width: 700,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 700,
          boxSizing: "border-box",
          maxWidth: "100%",
        },
      }}
      //variant="persistent"
      anchor="right"
      onClose={onClose}
      open={open}
    >
      <mui.IconButton onClick={onClose}>
        {theme.direction === "ltr" ? <icons.ChevronLeft /> : <icons.ChevronRight />}
      </mui.IconButton>

      {open ? children : null}
    </mui.Drawer>
  );
}
