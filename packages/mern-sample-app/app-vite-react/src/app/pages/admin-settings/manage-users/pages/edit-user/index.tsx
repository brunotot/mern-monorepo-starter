import type { UserForm as UserFormModel } from "@org/lib-api-client";

import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserForm } from "../../components";

export default function EditUserPage() {
  const navigate = useNavigate();

  const { username: selectedUsername } = useParams<{ username: string }>();
  console.log(selectedUsername);
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
  };

  return (
    <React.Fragment key={selectedUserForm?.id}>
      <UserForm
        defaultValue={selectedUserForm!}
        onSubmit={handleSubmit}
        disableUsername
        disablePassword
      />
    </React.Fragment>
  );
}