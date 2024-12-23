import type { UserForm as UserFormModel } from "@org/lib-api-client";

import { Card } from "@mui/material";
import { useSnackbar } from "@/app/provider/SnackbarProvider";
import { tsrClient } from "@/lib/@ts-rest";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserForm } from "../../components";

export default function EditUserPage() {
  const navigate = useNavigate();
  const snack = useSnackbar();

  const { username: selectedUsername } = useParams<{ username: string }>();
  const [selectedUserForm, setSelectedUserForm] = React.useState<UserFormModel | undefined>(
    undefined,
  );
  React.useEffect(() => {
    const fetchUserForm = async () => {
      if (selectedUsername) {
        const res = await tsrClient.User.getFormByUsername({
          query: { username: selectedUsername },
        });
        if (res.status !== 200) throw new Error("Failed to fetch user form.");
        setSelectedUserForm(res.body);
      }
    };
    fetchUserForm();
  }, [selectedUsername]);

  const handleSubmit = async (model: UserFormModel) => {
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", model);
    await tsrClient.User.updateUser({
      body: model,
    });
    navigate("/admin/users");
    snack({
      body: "User updated successfully",
      severity: "success",
    });
  };

  return (
    <>
      <UserForm
        key={selectedUserForm?.id}
        defaultValue={selectedUserForm!}
        onSubmit={handleSubmit}
        groups={["update"]}
      />
    </>
  );

  return (
    <Card elevation={3} sx={{ p: 4 }}>
      <UserForm
        key={selectedUserForm?.id}
        defaultValue={selectedUserForm!}
        onSubmit={handleSubmit}
        groups={["update"]}
      />
    </Card>
  );
}
