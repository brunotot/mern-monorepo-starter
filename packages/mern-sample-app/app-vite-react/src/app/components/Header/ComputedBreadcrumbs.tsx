import type { TODO } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { type UIMatch, useMatches } from "react-router-dom";

type Crumb = {
  match: UIMatch<unknown, unknown>;
  label: string;
};

function convertToCrumbs(matches: UIMatch<unknown, unknown>[]): /*Crumb[]*/ TODO[] {
  const crumbs: Crumb[] = [];

  console.log(matches);

  for (const match of matches) {
    const handle: TODO = match.handle;
    console.log(match);

    if (handle?.crumb) {
      crumbs.push({
        match: match,
        label: handle?.crumb?.(match.params) || undefined,
      });
    }

    /*if (
      "handle" in match &&
      match.handle &&
      typeof match.handle === "object" &&
      "crumb" in match.handle &&
      match.handle.crumb &&
      typeof match.handle.crumb === "function"
    ) {
      crumbs.push({
        match: match,
        label: handle?.crumb?.(match.params) || undefined,
      });
    }*/
  }

  return crumbs;
}

export function ComputedBreadcrumbs() {
  const matchesDesktop = mui.useMediaQuery("(min-width:678px)");
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
        <mui.Button
          variant="outlined"
          onClick={handleOpen}
          data-driver="breadcrumbs"
          sx={{ borderRadius: 0.25 }}
        >
          <mui.Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "65vw",
            }}
          >
            {crumbs[crumbs.length - 1].label}
          </mui.Box>
        </mui.Button>
        <mui.Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <mui.Box paddingInline={2}>
            <mui.Breadcrumbs
              separator={<icons.NavigateNext fontSize="small" />}
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
                <mui.Link
                  key={index}
                  component={RouterLink}
                  to={crumb.match.handle?.disableLink === true ? "#" : crumb.match.pathname}
                  underline="hover"
                  color={index === crumbs.length - 1 ? "text.primary" : "inherit"}
                >
                  {crumb.label}
                </mui.Link>
              ))}
            </mui.Breadcrumbs>
          </mui.Box>
        </mui.Menu>
      </>
    );
  }

  return (
    <mui.Breadcrumbs aria-label="breadcrumb" data-driver="breadcrumbs" separator={<icons.NavigateNext fontSize="small" />}>
      {crumbs.map((crumb, index) => (
        <mui.Link
          key={index}
          component={RouterLink}
          to={crumb.match.handle?.disableLink === true ? "#" : crumb.match.pathname}
          underline="hover"
          color={index === crumbs.length - 1 ? "text.primary" : "inherit"}
        >
          {crumb.label}
        </mui.Link>
      ))}
    </mui.Breadcrumbs>
  );
}
