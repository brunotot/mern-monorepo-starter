import type { UserDto } from "@org/lib-api-client";
import type { zod } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { DatatableContainer, ClientDatatable } from "@org/app-vite-react/app/components/Datatable";
import { DatatableFilterButton } from "@org/app-vite-react/app/components/Datatable/components/DatatableFilterButton";
import { InputText } from "@org/app-vite-react/app/forms";
import { tsrClient, tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useZodForm } from "@org/app-vite-react/lib/react-hook-form";
import { z } from "@org/lib-commons";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useNavigate } from "react-router-dom";

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

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_USER_FILTERS: UserFilters = {
  username: "",
  email: "",
};

export default function ManageUsersPage() {
  const [filters, setFilters] = React.useState<Partial<UserFilters>>({});
  const {
    control,
    handleSubmit: handleSearch,
    form,
  } = useZodForm<typeof UserFilters>({
    schema: UserFilters,
    defaultValue: DEFAULT_USER_FILTERS,
  });

  const { data, isPending, refetch } = tsrQuery.User.findAll.useQuery({
    queryKey: ["User.findAll"],
    staleTime: 1000,
  });

  const filteredData = React.useMemo(
    () =>
      data?.body.filter(user => {
        const filterUsername = (filters?.username ?? "").toLowerCase();
        const filterEmail = (filters?.email ?? "").toLowerCase();

        const username = (user.username ?? "").toLowerCase();
        const email = (user.email ?? "").toLowerCase();

        return username.includes(filterUsername) && email.includes(filterEmail);
      }) || [],
    [data?.body, filters],
  );

  const confirm = useConfirm();
  const navigate = useNavigate();

  /*const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });*/

  /*const fetchUsers = useCallback(async () => {
    const query = buildPaginationQueryParams(paginationOptions);
    const users = await tsrClient.User.findAllPaginated({ query });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);*/

  if (isPending) {
    return <></>;
  }

  if (data?.status !== 200) {
    return <div>Error</div>;
  }

  const onSearch = (model: UserFilters) => {
    setFilters(model);
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

      <DatatableContainer>
        <mui.Box padding={2} display="flex" alignItems="center" justifyContent="space-between">
          <DatatableFilterButton
            onClear={() => form.reset()}
            onSearch={handleSearch(onSearch)}
            filters={[
              {
                label: "Username",
                isActive: () => form.getValues().username?.length > 0,
                render: () => <InputText label="Username" control={control} name="username" />,
              },
              {
                label: "Email",
                isActive: () => form.getValues().email?.length > 0,
                render: () => <InputText label="Email" control={control} name="email" />,
              },
            ]}
          />
          <mui.Button
            variant="contained"
            startIcon={<icons.Add />}
            color="success"
            onClick={() => navigate("/admin/users/add")}
          >
            Add User
          </mui.Button>
        </mui.Box>
        <ClientDatatable<UserDto>
          data={filteredData}
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
