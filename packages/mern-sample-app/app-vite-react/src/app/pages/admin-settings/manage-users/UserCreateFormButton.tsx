import type { User } from "@org/lib-api-client";

import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent } from "@mui/material";
import { UserForm } from "@org/app-vite-react/app/pages/admin-settings/manage-users/UserForm";
import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useState } from "react";

export type UserCreateFormButtonProps = {
  afterUpdate?: () => void;
};

const DEFAULT_FORM_STATE: User = {
  _id: "",
  username: "",
  roles: ["user"],
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", user);
    // @ts-expect-error Remove later
    await tsrClient.User.createOne({
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
