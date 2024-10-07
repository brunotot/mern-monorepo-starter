import type { PaginationOptions, User } from "@org/lib-api-client";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import {
  DatatableContainer,
  ServerDatatable,
  DEFAULT_PAGINATION_OPTIONS,
} from "@org/app-vite-react/app/components/Datatable";
import { FixedBadge } from "@org/app-vite-react/app/pages/admin-settings/manage-users/FixedBadge";
import { UserCreateFormButton } from "@org/app-vite-react/app/pages/admin-settings/manage-users/UserCreateFormButton";
import { tsrQuery } from "@org/app-vite-react/lib/@ts-rest";
import { useState } from "react";

/*function buildPaginationQueryParams(paginationOptions: PaginationOptions): {
  paginationOptions: string;
} {
  return { paginationOptions: JSON.stringify(paginationOptions) };
}*/

export function ManageUsersPage() {
  const { data, isPending } = tsrQuery.User.findAll.useQuery({
    queryKey: ["User.findAll"],
    staleTime: 1000,
  });

  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });

  /*const fetchUsers = useCallback(async () => {
    const query = buildPaginationQueryParams(paginationOptions);
    const users = await tsrClient.User.findAllPaginated({ query });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);*/

  /*useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);*/

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
    return <div>Loading on home page...</div>;
  }

  if (data?.status !== 200) {
    return <div>Error</div>;
  }

  return (
    <>
      {/*<mui.Typography variant="h5">Manage users</mui.Typography>*/}
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
          <UserCreateFormButton afterUpdate={() => alert("Not implemented yet")} />
        </mui.Box>
        <ServerDatatable<User>
          data={data.body}
          count={data.body.length}
          keyMapper={user => user.username}
          paginationOptions={paginationOptions}
          onPaginationOptionsChange={paginationOptions => setPaginationOptions(paginationOptions)}
          columns={[
            {
              id: "username",
              renderHeader: () => "Username",
              renderBody: user => user.username,
              sort: "username",
            },
            {
              id: "roles",
              renderHeader: () => "Roles",
              renderBody: user => user.roles.join(", "),
            },
            {
              id: "actions",
              renderHeader: () => "Actions",
              renderBody: () => (
                <mui.Button
                  variant="contained"
                  color="error"
                  onClick={() => alert("Not implemented yet")}
                >
                  Delete
                </mui.Button>
              ),
            },
          ]}
        />
      </DatatableContainer>
    </>
  );
}
