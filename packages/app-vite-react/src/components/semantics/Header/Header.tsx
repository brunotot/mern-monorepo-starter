import { Menu as MenuIcon } from "@mui/icons-material";
import type { Breakpoint, SxProps, Theme } from "@mui/material";
import {
  Box,
  Menu,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";
import {
  InputLayoutToggle,
  InputLocaleSelect,
  InputThemeToggle,
} from "@org/app-vite-react/components/inputs";
import { useMatches } from "react-router-dom";
import type { TODO } from "@org/lib-commons";
import { sigSidebarOpen } from "@org/app-vite-react/signals/sigSidebarOpen";
import { UserMenuButton } from "./UserMenuButton";
import { useState } from "react";

export type MuiSxProps = SxProps<Theme>;

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
  sx?: MuiSxProps;
};

function ComputedBreadcrumbs() {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const matches: TODO[] = useMatches();
  const crumbs = matches
    .filter(match => Boolean(match.handle?.crumb))
    .map(match => match.handle.crumb(match.data));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: TODO) => {
    setAnchorEl(event.currentTarget);
  };

  if (!matchesDesktop) {
    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "65vw",
            }}
          >
            {crumbs[crumbs.length - 1]}
          </Box>
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Box paddingInline={2}>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                "& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li:first-child": {
                  width: "100%",
                },
                "& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li:nth-child(odd):not(:first-child)": {
                  flex: 1,
                },
              }}
            >
              {crumbs.map((crumb, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color={index === crumbs.length - 1 ? "text.primary" : "inherit"}
                  href="/"
                >
                  {crumb}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>
        </Menu>
      </>
    );
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb, index) => (
        <Link
          key={index}
          underline="hover"
          color={index === crumbs.length - 1 ? "text.primary" : "inherit"}
          href="/"
        >
          {crumb}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export function Header({
  backgroundColor,
  maxWidth = false,
  borderBottom = false,
  sx,
}: HeaderProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  //const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{
        backgroundColor,
        borderBottom: borderBottom ? "1px solid var(--mui-palette-divider)" : undefined,
      }}
    >
      <Container maxWidth={maxWidth} sx={{ paddingInline: "0 !important" }}>
        <Box
          display="flex"
          alignItems="center"
          paddingInline={matchesDesktop ? /*"1rem"*/ 0 : 0}
          gap={1}
          sx={sx}
        >
          {!matchesDesktop && (
            <IconButton onClick={() => (sigSidebarOpen.value = !sigSidebarOpen.value)}>
              <MenuIcon />
            </IconButton>
          )}

          <Box ml={matchesDesktop ? 3 : undefined} flexGrow={1}>
            <ComputedBreadcrumbs />
            {/*<InputFuzzySearch placeholder={t("doSearch")} />*/}
          </Box>

          <Box display="flex" alignItems="center">
            <InputThemeToggle />
            <InputLocaleSelect />
            {matchesDesktop && <InputLayoutToggle />}
            <UserMenuButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
