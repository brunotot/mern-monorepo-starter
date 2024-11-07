import type { UserForm as UserFormModel } from "@org/lib-api-client";

import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useNavigate } from "react-router-dom";

import { UserForm } from "../../components";

// eslint-disable-next-line react-refresh/only-export-components
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

  return (
    <UserForm groups={["create"]} defaultValue={DEFAULT_USER_FORM_STATE} onSubmit={handleSubmit} />
  );
}
