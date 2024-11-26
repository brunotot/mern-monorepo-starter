import * as mui from "@mui/material";
import * as inputs from "@/app/forms/input";
import { executeConstraintValidation } from "@/app/models/ConstraintViolation";
import { useZodForm, type FormProps } from "@/lib/react-hook-form";
import { ROLE_LIST, UserForm as UserFormModel } from "@org/lib-api-client";
import { z, debounce } from "@org/lib-commons";

function buildSchema(groups: string[]) {
  return groups.includes("create")
    ? UserFormModel.merge(
        z.object({
          username: UserFormModel.shape.username.refine(
            debounce(async (username: string) => {
              return await executeConstraintValidation({
                body: { username },
                options: { groups },
                schemaPath: "User.usernameShouldBeUnique",
              });
            }, 500),
            "Username already exists",
          ),
        }),
      )
    : UserFormModel;
}

export function UserForm({ defaultValue, onSubmit, groups = [] }: FormProps<UserFormModel>) {
  const { control, handleSubmit, errors, form } = useZodForm({
    schema: buildSchema(groups),
    defaultValue,
  });

  return (
    <mui.Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={1.5}
      width={300}
      margin="0 auto"
    >
      <inputs.InputText
        control={control}
        name="username"
        required
        disabled={groups.includes("update")}
        label="Username"
        error={errors?.username?.message}
      />

      {!groups.includes("update") && (
        <inputs.InputText
          required
          control={control}
          name="password"
          label="Password"
          error={errors?.password?.message}
          type="password"
        />
      )}

      <inputs.InputText
        control={control}
        name="firstName"
        label="First name"
        error={errors?.firstName?.message}
      />

      <inputs.InputText
        control={control}
        name="lastName"
        label="Last name"
        error={errors?.lastName?.message}
      />

      <inputs.InputText
        control={control}
        name="email"
        label="Email"
        error={errors?.email?.message}
      />

      <inputs.InputSelect
        multiple
        required
        control={control}
        name="roles"
        options={ROLE_LIST}
        label="Roles"
      />

      <mui.Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </mui.Button>
    </mui.Box>
  );
}
