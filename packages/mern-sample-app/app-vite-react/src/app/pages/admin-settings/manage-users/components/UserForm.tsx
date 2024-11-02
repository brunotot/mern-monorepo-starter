import * as mui from "@mui/material";
import { useZodForm, type FormProps } from "@org/app-vite-react/lib/react-hook-form";
import { ROLE_LIST, UserForm as UserFormModel } from "@org/lib-api-client";
import { Controller } from "react-hook-form";

export type UserFormProps = FormProps<UserFormModel> & {
  disableUsername?: boolean;
  disablePassword?: boolean;
};

export function UserForm({
  defaultValue,
  onSubmit,
  disablePassword = false,
  disableUsername = false,
}: UserFormProps) {
  const { control, handleSubmit, errors } = useZodForm({
    schema: UserFormModel,
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
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <mui.TextField
            {...field}
            required
            disabled={disableUsername}
            label="Username"
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
        )}
      />

      {!disablePassword && (
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <mui.TextField
              {...field}
              required
              label="Password"
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <mui.TextField
            {...field}
            label="First name"
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <mui.TextField
            {...field}
            label="Last name"
            helperText={errors?.lastName?.message}
            error={!!errors?.lastName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <mui.TextField
            {...field}
            label="Email"
            helperText={errors?.email?.message}
            error={!!errors?.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="roles"
        render={({ field }) => (
          <mui.Autocomplete
            {...field}
            multiple
            options={ROLE_LIST}
            getOptionLabel={option => option}
            disableCloseOnSelect
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
            filterSelectedOptions
            renderOption={(props, option) => (
              <mui.MenuItem {...props} key={option}>
                {option}
              </mui.MenuItem>
            )}
            renderInput={params => (
              <mui.TextField
                {...params}
                label="Realm roles"
                placeholder="Roles"
                error={!!errors?.roles?.message}
                helperText={errors?.roles?.message}
              />
            )}
          />
        )}
      />

      <mui.Button type="submit" variant="contained" color="primary">
        Submit
      </mui.Button>
    </mui.Box>
  );
}
