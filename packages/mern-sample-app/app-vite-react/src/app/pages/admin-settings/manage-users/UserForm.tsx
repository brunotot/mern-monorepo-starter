import type { User, Role } from "@org/lib-api-client";

import { TextField, Button, Box, Autocomplete, MenuItem, Chip } from "@mui/material";
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
        name="username"
        value={value.username}
        onChange={e => mutate({ username: e.target.value })}
        required
      />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={["admin", "user"]}
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
        renderInput={params => <TextField {...params} label="Roles" placeholder="Roles" />}
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
