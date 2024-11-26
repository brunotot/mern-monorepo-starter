import { DEFAULT_USER_FORM_STATE, type UserForm as UserFormModel } from "@org/lib-api-client";
import { useNavigate } from "react-router-dom";

import { UserForm } from "../../components";
import { useSnackbar } from "@/app/provider/SnackbarProvider";
import { tsrClient } from "@/lib/@ts-rest";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const snack = useSnackbar();

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
