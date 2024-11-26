import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { keycloakLogout } from "@org/app-vite-react/lib/keycloak-js";
import React from "react";

import LogoutButton from "./LogoutButton";

export function UserMenuButton() {
  const matchesDesktop = mui.useMediaQuery("(min-width:678px)");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    keycloakLogout();
  };
  return (
    <mui.Box data-driver="userPanel" display="flex" alignItems="center">
      {matchesDesktop && (
        <mui.Box display="flex" alignItems="center" paddingRight={0.25} whiteSpace="nowrap">
          <mui.Typography>{sigUser.value?.name}</mui.Typography>
        </mui.Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              backgroundColor: "unset",
              width: 32,
              height: 32,
            }}
          >
            <icons.Face fontSize="large" color="info" />
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <mui.Box width={220}>
          <mui.Box paddingInline="0.75rem">
            <mui.Typography variant="h6">{sigUser.value?.name}</mui.Typography>
            <mui.Typography variant="body2" color="textSecondary">
              {sigUser.value?.username}
            </mui.Typography>

            <mui.Divider sx={{ marginBlock: "0.5rem" }} />

            <mui.MenuItem sx={{ paddingInline: "0.5rem" }} onClick={handleClose}>
              <mui.ListItemIcon>
                <icons.Settings />
              </mui.ListItemIcon>
              <mui.ListItemText primary={"Settings"} />
            </mui.MenuItem>
            <mui.MenuItem sx={{ paddingInline: "0.5rem" }} onClick={handleClose}>
              <mui.ListItemIcon>
                <icons.Notifications />
              </mui.ListItemIcon>
              <mui.ListItemText primary={"Notifications"} />
            </mui.MenuItem>

            <mui.Divider />

            <LogoutButton handleLogout={handleLogout} />
          </mui.Box>
        </mui.Box>
      </Menu>
    </mui.Box>
  );
}
