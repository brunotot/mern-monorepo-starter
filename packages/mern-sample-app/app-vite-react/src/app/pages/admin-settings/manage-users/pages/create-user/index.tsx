import type { UserForm as UserFormModel } from "@org/lib-api-client";

import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useNavigate } from "react-router-dom";

import { DEFAULT_USER_FORM_STATE, UserForm } from "../../components";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const handleSubmit = async (model: UserFormModel) => {
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", model);
    await tsrClient.User.createUser({
      body: model,
    });
    navigate("/admin/users");
  };

  return <UserForm defaultValue={DEFAULT_USER_FORM_STATE} onSubmit={handleSubmit} />;
}
