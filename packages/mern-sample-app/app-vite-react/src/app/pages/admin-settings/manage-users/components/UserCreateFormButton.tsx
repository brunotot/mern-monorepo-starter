import type { UserForm as UserFormModel } from "@org/lib-api-client";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { UserForm } from "@org/app-vite-react/app/pages/admin-settings/manage-users/components";
import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Sidenav } from "./Sidenav";

export type UserCreateFormButtonProps = {
  afterUpdate?: () => void;
};

export const DEFAULT_USER_FORM_STATE: UserFormModel = {
  id: "",
  username: "",
  password: "",
  roles: ["avr-user"],
  email: "",
  firstName: "",
  lastName: "",
  enabled: true,
};

export function UserCreateFormButton({ afterUpdate }: UserCreateFormButtonProps) {
  const navigate = useNavigate();

  const handleSubmit = async (model: UserFormModel) => {
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", model);
    await tsrClient.User.createUser({
      body: model,
    });
    // setUser(DEFAULT_FORM_STATE);
    setSidebarOpen(false);
    afterUpdate?.();
  };

  //const theme = mui.useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  const onAddUser = () => {
    navigate("/admin/users/add");
  };

  return (
    <>
      <mui.Button variant="contained" startIcon={<icons.Add />} color="success" onClick={onAddUser}>
        Add User
      </mui.Button>
      <Sidenav open={sidebarOpen} onClose={handleDrawerClose}>
        <UserForm defaultValue={DEFAULT_USER_FORM_STATE} onSubmit={handleSubmit} />
      </Sidenav>
    </>
  );
}
