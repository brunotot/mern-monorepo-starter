import { Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import type { TODO, User } from "@org/lib-commons";
import { UserForm } from "@org/app-vite-react/app/pages/Home/UserForm";
import { Add } from "@mui/icons-material";
import { apiClient } from "@org/app-vite-react/setup/apiClient.setup";

export type UserCreateFormButtonProps = {
  afterUpdate?: () => void;
};

const DEFAULT_FORM_STATE: User = {
  refreshToken: [],
  username: "",
  email: "",
  password: "",
  roles: ["USER"],
};

export function UserCreateFormButton({ afterUpdate }: UserCreateFormButtonProps) {
  const [user, setUser] = useState<User>(DEFAULT_FORM_STATE);

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: TODO) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted:", user);
    await apiClient.User.createOne({
      body: user,
    });
    setUser(DEFAULT_FORM_STATE);
    setOpen(false);
    afterUpdate?.();
  };

  return (
    <>
      <Button variant="contained" startIcon={<Add />} color="success" onClick={onOpen}>
        Add User
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <UserForm value={user} onChange={setUser} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
