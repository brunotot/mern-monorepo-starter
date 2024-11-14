import type { UserForm as UserFormModel } from "@org/lib-api-client";

import { useSnackbarContext } from "@org/app-vite-react/app/provider/SnackbarProvider";
import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";
import { useNavigate } from "react-router-dom";

import { UserForm } from "../../components";

// TODO: Move this to shared package.
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
  const snack = useSnackbarContext();

  const handleSubmit = async (model: UserFormModel) => {
    await tsrClient.User.createUser({
      body: model,
    });
    navigate("/admin/users");
    snack({
      body: `User ${model.username} successfully created`,
      severity: "success",
    });
  };

  return (
    <UserForm groups={["create"]} defaultValue={DEFAULT_USER_FORM_STATE} onSubmit={handleSubmit} />
  );
}
