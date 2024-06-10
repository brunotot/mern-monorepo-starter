import { Button, Dialog, DialogContent } from "@mui/material";
import { client } from "../../core/client";
import { useState } from "react";
import { TODO, User } from "@org/shared";
import { UserForm } from "../UserForm/UserForm";

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
    await client.User.create({
      body: user,
    });
    setUser(DEFAULT_FORM_STATE);
    setOpen(false);
    afterUpdate?.();
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={onOpen}>
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
