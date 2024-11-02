import type { PaginationOptions, UserDto, UserForm as UserFormModel } from "@org/lib-api-client";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import {
  DatatableContainer,
  //ServerDatatable,
  DEFAULT_PAGINATION_OPTIONS,
  ClientDatatable,
} from "@org/app-vite-react/app/components/Datatable";
import {
  FixedBadge,
  //ResponsiveTable,
  UserCreateFormButton,
  UserForm,
} from "@org/app-vite-react/app/pages/admin-settings/manage-users/components";
import { tsrClient, tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";

import { Sidenav } from "./components/Sidenav";
import { useNavigate } from "react-router-dom";

/*function buildPaginationQueryParams(paginationOptions: PaginationOptions): {
  paginationOptions: string;
} {
  return { paginationOptions: JSON.stringify(paginationOptions) };
}*/

export default function ManageUsersPage() {
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

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  /*const fetchUsers = useCallback(async () => {
    const query = buildPaginationQueryParams(paginationOptions);
    const users = await tsrClient.User.findAllPaginated({ query });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);*/

  const handleSubmit = async (model: UserFormModel) => {
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

  const badgeContent: number = 6;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isPending) {
    return <></>;
  }

  if (data?.status !== 200) {
    return <div>Error</div>;
  }

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
          <UserForm defaultValue={selectedUserForm!} onSubmit={handleSubmit} disablePassword />
        </React.Fragment>
      </Sidenav>

      <DatatableContainer>
        <mui.Box padding={2} display="flex" alignItems="center" justifyContent="space-between">
          <mui.Button
            variant="contained"
            color="primary"
            sx={{ paddingInline: 1 }}
            onClick={handleClick}
          >
            <icons.FilterAltOutlined />
            <mui.Box flex="1" marginRight={1}>
              Filters
            </mui.Box>
            <FixedBadge value={badgeContent > 0 ? badgeContent : undefined} />
          </mui.Button>
          <mui.Menu
            slotProps={{ paper: { sx: { width: "320px" } } }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <div>
              <mui.Accordion disableGutters>
                <mui.AccordionSummary>
                  <mui.Box display="flex" gap={1} alignItems="center">
                    <icons.FilterAlt />
                    <mui.Typography variant="h6">Filters</mui.Typography>
                  </mui.Box>
                </mui.AccordionSummary>
              </mui.Accordion>
              <mui.Accordion disableGutters>
                <mui.AccordionSummary
                  expandIcon={<icons.ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Username
                </mui.AccordionSummary>
                <mui.AccordionDetails>
                  <mui.TextField label="Search by username" placeholder="johndoe" />
                </mui.AccordionDetails>
              </mui.Accordion>
              <mui.Accordion disableGutters>
                <mui.AccordionSummary
                  expandIcon={<icons.ExpandMore />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  Email
                </mui.AccordionSummary>
                <mui.AccordionDetails>
                  <mui.TextField label="Search by email" placeholder="johndoe@mail.com" />
                </mui.AccordionDetails>
              </mui.Accordion>
              <mui.Accordion disableGutters sx={{ boxShadow: "none" }}>
                <mui.AccordionSummary
                  expandIcon={<icons.ExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  Roles
                </mui.AccordionSummary>
                <mui.AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </mui.AccordionDetails>
                <mui.AccordionActions>
                  <mui.Button>Cancel</mui.Button>
                  <mui.Button>Agree</mui.Button>
                </mui.AccordionActions>
              </mui.Accordion>
              <mui.Box
                sx={{
                  paddingInline: 2,
                  backgroundImage: "var(--mui-overlays-1)",
                  paddingBottom: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "var(--mui-palette-background-paper)",
                }}
              >
                <mui.Button variant="contained" color="primary">
                  Search
                </mui.Button>
              </mui.Box>
            </div>
          </mui.Menu>
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
