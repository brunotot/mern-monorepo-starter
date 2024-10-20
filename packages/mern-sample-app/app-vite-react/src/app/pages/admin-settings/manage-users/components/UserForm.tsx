import { TextField, Button, Box, Autocomplete, MenuItem, Chip } from "@mui/material";
import { type Role, ROLE_LIST, type User } from "@org/lib-api-client";
import React from "react";

export type UserFormProps = {
  value: User;
  onChange: (newState: User) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function UserForm({ value, onChange, onSubmit }: UserFormProps) {
  const mutate = (diff: Partial<User>) => {
    onChange({
      ...value,
      ...diff,
      enabled: true,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px", margin: "0 auto" }}
    >
      <TextField
        label="Username"
        value={value.username}
        onChange={e => mutate({ username: e.target.value })}
        required
      />
      <TextField
        label="First name"
        value={value.firstName}
        onChange={e => mutate({ firstName: e.target.value })}
        required
      />
      <TextField
        label="Last name"
        value={value.lastName}
        onChange={e => mutate({ lastName: e.target.value })}
        required
      />
      <TextField
        label="Email"
        value={value.email}
        onChange={e => mutate({ email: e.target.value })}
        required
      />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={ROLE_LIST}
        getOptionLabel={option => option}
        onChange={(_, newValue) => mutate({ roles: newValue as Role[] })}
        value={value.roles}
        disableCloseOnSelect
        filterSelectedOptions
        renderOption={(props, option) => (
          <MenuItem {...props} key={option}>
            {option}
          </MenuItem>
        )}
        renderInput={params => <TextField {...params} label="Realm roles" placeholder="Roles" />}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} key={option} label={option} />
          ))
        }
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
