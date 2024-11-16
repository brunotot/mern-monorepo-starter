import type { zod } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import {
  DatatableContainer,
  DEFAULT_PAGINATION_OPTIONS,
} from "@org/app-vite-react/app/components/Datatable";
import { DatatableFilterButton } from "@org/app-vite-react/app/components/Datatable/components/DatatableFilterButton";
import { Datatable } from "@org/app-vite-react/app/components/Datatable/Datatable";
import { InputText } from "@org/app-vite-react/app/forms";
import { useConfirm } from "@org/app-vite-react/app/provider/ConfirmProvider";
import { useSnackbar } from "@org/app-vite-react/app/provider/SnackbarProvider";
import { sigDirection } from "@org/app-vite-react/app/signals/sigDirection";
import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { tsrClient, tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useZodForm } from "@org/app-vite-react/lib/react-hook-form";
import { type PaginationOptions, type UserDto } from "@org/lib-api-client";
import { z } from "@org/lib-commons";
import React from "react";
import { useNavigate } from "react-router-dom";

import { TableRowMobile } from "./components/TableRowMobile";

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
  const navigate = useNavigate();
  const confirm = useConfirm();
  const snack = useSnackbar();
  const alignLeft = sigDirection.value === "rtl" ? "right" : "left";
  const [filters, setFilters] = React.useState<Partial<UserFilters>>({});
  const {
    control,
    handleSubmit: handleSearch,
    form,
  } = useZodForm<typeof UserFilters>({
    schema: UserFilters,
    defaultValue: DEFAULT_USER_FILTERS,
  });

  const { data, refetch } = tsrQuery.User.findAll.useSuspenseQuery({
    queryKey: ["User.findAll"],
    staleTime: 1000,
  });

  /*const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };*/

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

  const [pagination, setPagination] = React.useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });

  /*const { data: userData, isPending: isPendingUsers, refetch: refetchUsers } = tsrQuery.User.findAllPaginated.useQuery({
    queryKey: ['User.findAllPaginated', paginationOptions],
    queryData: {query: buildPaginationQueryParams(paginationOptions)},
    staleTime: 1000
  });*/

  return (
    <>
      {/*<mui.Typography variant="h5">Manage users</mui.Typography>*/}

      <DatatableContainer>
        <mui.Box padding={2} display="flex" alignItems="center" justifyContent="space-between">
          <DatatableFilterButton
            onClear={() => form.reset()}
            onSearch={handleSearch(setFilters)}
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
        <Datatable<UserDto>
          sync={true}
          pagination={pagination}
          onPaginationChange={setPagination}
          data={filteredData}
          keyMapper={({ username }) => username}
          renderMobileRow={user => (
            <TableRowMobile title={user.username} subtitle={user.email || "--"} />
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
                      confirm({
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
                    onClick={() => {
                      navigate(`/admin/users/${user.username}/edit`);
                      //setOpen(true);
                    }}
                  >
                    Edit
                  </mui.Button>
                </mui.Box>
              ),
            },
          ]}
        />
        {/*<mui.Drawer
          hideBackdrop
          variant="temporary"
          open={open}
          anchor="right"
          onClose={toggleDrawer(false)}
          ModalProps={{}}
          sx={{ left: "unset" }}
          BackdropProps={{ invisible: true }}
        >
          <UserForm
            groups={["update"]}
            onSubmit={() => {}}
            defaultValue={DEFAULT_USER_FORM_STATE}
          />
        </mui.Drawer>*/}
      </DatatableContainer>
    </>
  );
}
