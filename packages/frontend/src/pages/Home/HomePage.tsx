import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Menu,
  Typography,
} from "@mui/material";
import { client } from "../../core/client";
import { useCallback, useEffect, useState } from "react";
import { PaginationOptions, TODO, User } from "@org/shared";
import { UserCreateFormButton } from "../UserCreateFormButton";
import { ServerDatatable } from "../../core/components/semantics/Datatable/impl/ServerDatatable";
import { DEFAULT_PAGINATION_OPTIONS } from "../../core/components/semantics/Datatable/types";
import { type UserPageableResponseDto } from "@org/shared";
import { ExpandMore, FilterAlt, FilterAltOutlined } from "@mui/icons-material";
import { DatatableContainer } from "../../core/components/semantics/Datatable/components/DatatableContainer";

export function HomePage() {
  const [userResponse, setUserResponse] = useState<UserPageableResponseDto>();
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...DEFAULT_PAGINATION_OPTIONS,
    order: ["username asc"],
  });

  const fetchUsers = useCallback(async () => {
    const users = await client.User.pagination({
      query: { paginationOptions: JSON.stringify(paginationOptions) },
    });
    if (users.status !== 200) throw new Error("Failed to fetch users.");
    setUserResponse(users.body);
  }, [paginationOptions]);

  const deleteUser = useCallback(
    async (username: string) => {
      const response = await client.User.deleteByUsername({ body: { username } });
      if (response.status !== 201) throw new Error("Failed to delete user.");
      fetchUsers();
    },
    [fetchUsers],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const badgeContent: number = 2;

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
        <Box padding={2} display="flex" alignItems="center" justifyContent="space-between">
          <Button variant="contained" color="primary" sx={{ paddingLeft: 1 }} onClick={handleClick}>
            <FilterAltOutlined />
            <Box flex="1">Filters</Box>
            <Badge
              badgeContent={badgeContent > 0 ? badgeContent : undefined}
              color="warning"
              overlap="circular"
              sx={{
                transform: "translate(0px, 50%)",
                "& .MuiBadge-badge": {
                  position: badgeContent > 0 ? "relative" : undefined,
                },
              }}
            />
          </Button>
          <Menu
            slotProps={{ paper: { sx: { width: "320px" } } }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <div>
              <Accordion disableGutters>
                <AccordionSummary>
                  <Box display="flex" gap={1} alignItems="center">
                    <FilterAlt />
                    <Typography variant="h6">Filters</Typography>
                  </Box>
                </AccordionSummary>
              </Accordion>
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Accordion 1
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  Accordion 2
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>
              <Accordion disableGutters defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  Accordion Actions
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
                <AccordionActions>
                  <Button>Cancel</Button>
                  <Button>Agree</Button>
                </AccordionActions>
              </Accordion>
            </div>
          </Menu>
          <UserCreateFormButton afterUpdate={fetchUsers} />
        </Box>
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
              id: "email",
              align: "left",
              renderHeader: () => "Email",
              renderBody: user => user.email,
              sort: "email",
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
                <Button
                  //size="small"
                  variant="contained"
                  color="error"
                  onClick={() => deleteUser(user.username)}
                >
                  Delete
                </Button>
              ),
            },
          ]}
        />
      </DatatableContainer>
    </>
  );
}
