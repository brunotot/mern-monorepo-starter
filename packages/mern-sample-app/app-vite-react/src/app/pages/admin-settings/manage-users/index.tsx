import type { PaginationOptions, UserDto, UserForm as UserFormModel } from "@org/lib-api-client";
import type { zod } from "@org/lib-commons";

import * as mui from "@mui/material";
import {
  DatatableContainer,
  //ServerDatatable,
  DEFAULT_PAGINATION_OPTIONS,
  ClientDatatable,
} from "@org/app-vite-react/app/components/Datatable";
import { DatatableFilterButton } from "@org/app-vite-react/app/components/Datatable/components/DatatableFilterButton";
import {
  //ResponsiveTable,
  UserCreateFormButton,
  UserForm,
} from "@org/app-vite-react/app/pages/admin-settings/manage-users/components";
import { tsrClient, tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useZodForm } from "@org/app-vite-react/lib/react-hook-form";
import { z } from "@org/lib-commons";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Sidenav } from "./components/Sidenav";

/*function buildPaginationQueryParams(paginationOptions: PaginationOptions): {
  paginationOptions: string;
} {
  return { paginationOptions: JSON.stringify(paginationOptions) };
}*/

export const UserFilters = z.object({
  username: z.string(),
  email: z.string(),
});

export type UserFilters = zod.infer<typeof UserFilters>;

export const DEFAULT_USER_FILTERS: UserFilters = {
  username: "",
  email: "",
};

export default function ManageUsersPage() {
  const {
    control,
    handleSubmit: handleSearch,
    errors,
  } = useZodForm<typeof UserFilters>({
    schema: UserFilters,
    defaultValue: DEFAULT_USER_FILTERS,
  });

  const { data, isPending, refetch } = tsrQuery.User.findAll.useQuery({
    queryKey: ["User.findAll"],
    staleTime: 1000,
  });
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });

  const [selectedUsername, setSelectedUsername] = React.useState<string | undefined>(undefined);
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

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  /*const fetchUsers = useCallback(async () => {
    const query = buildPaginationQueryParams(paginationOptions);
    const users = await tsrClient.User.findAllPaginated({ query });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);*/

  const onSubmit = async (model: UserFormModel) => {
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log("Form submitted:", model);
    await tsrClient.User.updateUser({
      body: model,
    });
    // setUser(DEFAULT_FORM_STATE);
    setSidebarOpen(false);
    refetch();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isPending) {
    return <></>;
  }

  if (data?.status !== 200) {
    return <div>Error</div>;
  }

  const onSearch = (model: UserFilters) => {
    console.log(model);
  };

  const handleDelete = async (user: UserDto) => {
    confirm({
      description: `This will permanently delete user "${user.username}".`,
      cancellationText: "Cancel",
      cancellationButtonProps: {
        color: "inherit",
      },
      confirmationText: "Delete",
      confirmationButtonProps: {
        color: "error",
        variant: "contained",
      },
    })
      .then(async () => {
        await tsrClient.User.deleteUser({
          query: {
            id: user.id!,
          },
        });
        refetch();
      })
      .catch(() => {
        //console.log("Deletion cancelled.")
      });
  };

  async function handleEdit(user: UserDto) {
    //handleDrawerOpen();
    //setSelectedUsername(user.username);
    navigate(`/admin/users/${user.username}/edit`);
  }

  return (
    <>
      {/*<mui.Typography variant="h5">Manage users</mui.Typography>*/}

      {/*<ResponsiveTable />*/}

      <Sidenav open={sidebarOpen} onClose={handleDrawerClose}>
        <React.Fragment key={selectedUserForm?.id}>
          <UserForm defaultValue={selectedUserForm!} onSubmit={onSubmit} disablePassword />
        </React.Fragment>
      </Sidenav>

      <DatatableContainer>
        <mui.Box padding={2} display="flex" alignItems="center" justifyContent="space-between">
          <DatatableFilterButton
            onSearch={handleSearch(onSearch)}
            filters={[
              {
                label: "Username",
                control: control,
                name: "username",
                render: ({ field }) => (
                  <mui.TextField
                    {...field}
                    required
                    label="Username"
                    error={!!errors?.username?.message}
                    helperText={errors?.username?.message}
                  />
                ),
              },
              {
                label: "Email",
                control: control,
                name: "email",
                render: ({ field }) => (
                  <mui.TextField
                    {...field}
                    required
                    label="Email"
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                ),
              },
            ]}
          />
          <UserCreateFormButton afterUpdate={refetch} />
        </mui.Box>
        <ClientDatatable<UserDto>
          data={data.body}
          //count={data.body.length}
          //keyMapper={user => user.username}
          //paginationOptions={paginationOptions}
          //onPaginationOptionsChange={paginationOptions => setPaginationOptions(paginationOptions)}
          columns={[
            {
              id: "username",
              renderHeader: () => "Username",
              renderBody: user => user.username,
              sort: (o1, o2) => {
                return (o1.username ?? "").localeCompare(o2.username ?? "");
              },
            },
            {
              id: "Email",
              renderHeader: () => "Email",
              renderBody: user => user.email || "-",
              sort: (o1, o2) => {
                return (o1.email ?? "").localeCompare(o2.email ?? "");
              },
            },
            {
              id: "First name",
              renderHeader: () => "First name",
              renderBody: user => user.firstName,
              sort: (o1, o2) => {
                return (o1.firstName ?? "").localeCompare(o2.firstName ?? "");
              },
            },
            {
              id: "Last name",
              renderHeader: () => "Last name",
              renderBody: user => user.lastName,
              sort: (o1, o2) => {
                return (o1.lastName ?? "").localeCompare(o2.lastName ?? "");
              },
            },
            {
              id: "roles",
              renderHeader: () => "Roles",
              renderBody: user => user.roles?.join(", "),
            },
            {
              id: "password",
              renderHeader: () => "Password",
              renderBody: user => (user.hasCredentials ? "Yes" : "No"),
              sort: (o1, o2) => {
                return (o1.hasCredentials ? "Yes" : "No").localeCompare(
                  o2.hasCredentials ? "Yes" : "No",
                );
              },
            },
            {
              id: "actions",
              renderHeader: () => "Actions",
              renderBody: user => (
                <mui.Box display="flex" alignItems="center" gap={1}>
                  <mui.Button variant="contained" color="error" onClick={() => handleDelete(user)}>
                    Delete
                  </mui.Button>
                  <mui.Button variant="contained" color="info" onClick={() => handleEdit(user)}>
                    Edit
                  </mui.Button>
                </mui.Box>
              ),
            },
          ]}
        />
      </DatatableContainer>
    </>
  );
}
