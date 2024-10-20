import type { User } from "@org/lib-api-client";

import * as icons from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import * as mui from "@mui/material";
import { Button } from "@mui/material";
import { UserForm } from "@org/app-vite-react/app/pages/admin-settings/manage-users/components";
import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useState } from "react";

export type UserCreateFormButtonProps = {
  afterUpdate?: () => void;
};

const DEFAULT_FORM_STATE: User = {
  id: "",
  username: "",
  enabled: true,
  roles: ["avr-user"],
};

export function UserCreateFormButton({ afterUpdate }: UserCreateFormButtonProps) {
  const [user, setUser] = useState<User>(DEFAULT_FORM_STATE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", user);
    await tsrClient.User.createUser({
      body: user,
    });
    setUser(DEFAULT_FORM_STATE);
    setSidebarOpen(false);
    afterUpdate?.();
  };

  const theme = mui.useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Button variant="contained" startIcon={<Add />} color="success" onClick={handleDrawerOpen}>
        Add User
      </Button>
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
        onClose={handleDrawerClose}
        open={sidebarOpen}
      >
        <mui.IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <icons.ChevronLeft /> : <icons.ChevronRight />}
        </mui.IconButton>

        <UserForm value={user} onChange={setUser} onSubmit={handleSubmit} />
      </mui.Drawer>
      {/*<Dialog open={open} onClose={onClose}>
        <DialogContent>
          <UserForm value={user} onChange={setUser} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>*/}
    </>
  );
}
