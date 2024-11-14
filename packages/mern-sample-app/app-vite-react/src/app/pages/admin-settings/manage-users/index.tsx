import type { UserDto } from "@org/lib-api-client";
import type { zod } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { DatatableContainer, ClientDatatable } from "@org/app-vite-react/app/components/Datatable";
import { DatatableFilterButton } from "@org/app-vite-react/app/components/Datatable/components/DatatableFilterButton";
import { InputText } from "@org/app-vite-react/app/forms";
import { useConfirmContext } from "@org/app-vite-react/app/provider/ConfirmProvider";
import { useSnackbarContext } from "@org/app-vite-react/app/provider/SnackbarProvider";
import { sigDirection } from "@org/app-vite-react/app/signals/sigDirection";
import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { tsrClient, tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useZodForm } from "@org/app-vite-react/lib/react-hook-form";
import { z } from "@org/lib-commons";
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

  const navigate = useNavigate();

  const confirmAction = useConfirmContext();
  const snack = useSnackbarContext();

  const alignLeft = sigDirection.value === "rtl" ? "right" : "left";

  const onSearch = (model: UserFilters) => {
    setFilters(model);
  };

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

  return (
    <>
      {/*<mui.Typography variant="h5">Manage users</mui.Typography>*/}

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
          renderMobileRow={user => (
            <mui.Box
              sx={{
                height: "100%",
                width: "100%", // Set to full width of the container
                //backgroundColor: "rgba(255, 255, 255, 0.05)", // Lightly contrasting background
                borderRadius: 1,
                border: "1px solid", // Border styling
                borderColor: "info.light", // Theme color for vibrant effect
                padding: 2,
                //boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
              }}
            >
              <mui.Typography variant="h6" sx={{ fontWeight: 600 }}>
                {user.username}
              </mui.Typography>
              <mui.Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                {user.email || "--"}
              </mui.Typography>
            </mui.Box>
          )}
          columns={[
            {
              id: "username",
              renderHeader: () => "Username",
              renderBody: user => user.username,
              align: alignLeft,
              sort: (o1, o2) => {
                return (o1.username ?? "").localeCompare(o2.username ?? "");
              },
            },
            {
              id: "Email",
              renderHeader: () => "Email",
              renderBody: user => user.email || "-",
              align: alignLeft,
              sort: (o1, o2) => {
                return (o1.email ?? "").localeCompare(o2.email ?? "");
              },
            },
            {
              id: "First name",
              renderHeader: () => "First name",
              renderBody: user => user.firstName,
              align: alignLeft,
              sort: (o1, o2) => {
                return (o1.firstName ?? "").localeCompare(o2.firstName ?? "");
              },
            },
            {
              id: "Last name",
              renderHeader: () => "Last name",
              renderBody: user => user.lastName,
              align: alignLeft,
              sort: (o1, o2) => {
                return (o1.lastName ?? "").localeCompare(o2.lastName ?? "");
              },
            },
            {
              id: "roles",
              renderHeader: () => "Roles",
              renderBody: user => user.roles?.join(", "),
              align: alignLeft,
            },
            {
              id: "password",
              renderHeader: () => "Password",
              renderBody: user => (user.hasCredentials ? "Yes" : "No"),
              align: alignLeft,
              sort: (o1, o2) => {
                return (o1.hasCredentials ? "Yes" : "No").localeCompare(
                  o2.hasCredentials ? "Yes" : "No",
                );
              },
            },
            {
              id: "actions",
              renderHeader: () => "Actions",
              align: alignLeft,
              renderBody: (user, { cleanup }) => (
                <mui.Box display="flex" alignItems="center" gap={1}>
                  <mui.Button
                    variant="contained"
                    color="error"
                    disabled={user.username === sigUser.value?.username}
                    onClick={() => {
                      confirmAction({
                        title: "Warning",
                        message: `Are you sure You want to delete user "${user.username}"?`,
                        onConfirm: async () => {
                          await tsrClient.User.deleteUser({
                            query: {
                              id: user.id!,
                            },
                          });
                          snack({
                            severity: "success",
                            body: `User "${user.username}" has been deleted.`,
                          });
                          cleanup();
                          refetch();
                        },
                      });
                    }}
                  >
                    Delete
                  </mui.Button>
                  <mui.Button
                    variant="contained"
                    color="info"
                    onClick={() => navigate(`/admin/users/${user.username}/edit`)}
                  >
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
