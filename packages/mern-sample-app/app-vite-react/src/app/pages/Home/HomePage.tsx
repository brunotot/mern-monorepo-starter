import { useCallback, useEffect, useState } from "react";
import type { PaginationOptions, TODO } from "@org/lib-commons";
import type { User } from "@org/lib-api-client";
import { type UserPageableResponseDto } from "@org/lib-commons";
import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

import { UserCreateFormButton } from "@org/app-vite-react/app/pages/Home/UserCreateFormButton";
import { FixedBadge } from "@org/app-vite-react/app/pages/Home/FixedBadge";
import { tsRestApiClient } from "@org/app-vite-react/lib/@ts-rest";
import {
  DatatableContainer,
  ServerDatatable,
  DEFAULT_PAGINATION_OPTIONS,
} from "@org/app-vite-react/app/components/Datatable";

function buildPaginationQueryParams(paginationOptions: PaginationOptions): {
  paginationOptions: string;
} {
  return { paginationOptions: JSON.stringify(paginationOptions) };
}

export function HomePage() {
  const [userResponse, setUserResponse] = useState<UserPageableResponseDto>();
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });

  const fetchUsers = useCallback(async () => {
    const query = buildPaginationQueryParams(paginationOptions);
    const users = await tsRestApiClient.User.findAllPaginated({ query });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);

  const deleteUser = useCallback(
    async (username: string) => {
      const response = await tsRestApiClient.User.deleteByUsername({ body: { username } });
      if (response.status !== 201) throw new Error("Failed to delete user.");
      fetchUsers();
    },
    [fetchUsers],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const badgeContent: number = 6;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: TODO) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
          <UserCreateFormButton afterUpdate={fetchUsers} />
        </mui.Box>
        <ServerDatatable<User>
          data={userResponse?.data ?? []}
          count={userResponse?.totalElements ?? 0}
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
              renderBody: user => (
                <mui.Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUser(user.username)}
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
