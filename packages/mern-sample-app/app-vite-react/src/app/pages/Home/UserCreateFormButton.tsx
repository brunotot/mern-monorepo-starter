import { Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import type { User } from "@org/lib-api-client";
import { UserForm } from "@org/app-vite-react/app/pages/Home/UserForm";
import { Add } from "@mui/icons-material";
import { tsRestApiClient } from "@org/app-vite-react/lib/@ts-rest";

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
    console.log("Form submitted:", user);
    await tsRestApiClient.User.createOne({
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
