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
import { InputLayoutToggle } from "@org/app-vite-react/app/inputs/InputLayoutToggle";
import { InputLocaleSelect } from "@org/app-vite-react/app/inputs/InputLocaleSelect";
import { InputDarkThemeToggle } from "@org/app-vite-react/app/inputs/InputDarkThemeToggle";
import { type UIMatch, useMatches } from "react-router-dom";
import { sigSidebarOpen } from "@org/app-vite-react/signals/sigSidebarOpen";
import { UserMenuButton } from "./UserMenuButton";
import { useState } from "react";
import { sigThemeOpts } from "@org/app-vite-react/signals/sigTheme";
import { sigLocale } from "@org/app-vite-react/signals/sigLocale";
import { sigLayout } from "@org/app-vite-react/signals/sigLayout";

export type MuiSxProps = SxProps<Theme>;

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
  sx?: MuiSxProps;
};

function convertToCrumbs(matches: UIMatch<unknown, unknown>[]): string[] {
  const crumbs: string[] = [];

  for (const match of matches) {
    if (
      "handle" in match &&
      match.handle &&
      typeof match.handle === "object" &&
      "crumb" in match.handle &&
      match.handle.crumb &&
      typeof match.handle.crumb === "function"
    ) {
      crumbs.push(match.handle.crumb(match.data));
    }
  }

  return crumbs;
}

function ComputedBreadcrumbs() {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const matches = useMatches();
  const crumbs = convertToCrumbs(matches);
  //.filter(match => "handle" in match && match.handle && typeof match.handle === "object" && "crumb" in match.handle && match.handle.crumb && typeof match.handle.crumb === "function")
  //.map(match => match.handle.crumb(match.data));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            <InputDarkThemeToggle
              value={!!sigThemeOpts.value?.dark}
              onChange={dark => (sigThemeOpts.value = { dark })}
            />
            <InputLocaleSelect
              value={sigLocale.value}
              onChange={locale => (sigLocale.value = locale)}
            />
            {matchesDesktop && (
              <InputLayoutToggle
                value={sigLayout.value}
                onChange={layout => (sigLayout.value = layout)}
              />
            )}
            <UserMenuButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}