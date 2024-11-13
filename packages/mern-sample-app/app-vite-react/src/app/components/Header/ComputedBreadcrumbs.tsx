import type { TODO } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { sigDirection } from "@org/app-vite-react/app/signals/sigDirection";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { type UIMatch, useMatches } from "react-router-dom";

type Crumb = {
  match: UIMatch<unknown, unknown>;
  label: string;
};

function convertToCrumbs(matches: UIMatch<unknown, unknown>[]): /*Crumb[]*/ TODO[] {
  const crumbs: Crumb[] = [];

  //console.log(matches);

  for (const match of matches) {
    const handle: TODO = match.handle;
    //console.log(match);

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

export function LocalBreadcrumbs({
  crumbs,
  mobileLayout,
}: {
  crumbs: TODO[];
  mobileLayout: boolean;
}) {
  const sx: mui.SxProps<mui.Theme> | undefined = !mobileLayout
    ? undefined
    : {
        "& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li:first-child": {
          width: "100%",
        },
        "& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li:nth-child(odd):not(:first-child)": {
          flex: 1,
        },
      };

  return (
    <mui.Breadcrumbs
      sx={sx}
      aria-label="breadcrumb"
      separator={
        sigDirection.value === "ltr" ? (
          <icons.NavigateNext fontSize="small" />
        ) : (
          <icons.NavigateBefore fontSize="small" />
        )
      }
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
  );
}

export function ComputedBreadcrumbs() {
  const matchesDesktop = mui.useMediaQuery("(min-width:678px)");
  const matches = useMatches();
  const crumbs = convertToCrumbs(matches);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  if (matchesDesktop) return <LocalBreadcrumbs crumbs={crumbs} mobileLayout={!matchesDesktop} />;

  return (
    <>
      <mui.Button
        variant="outlined"
        onClick={e => setAnchorEl(e.currentTarget)}
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
      <mui.Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <mui.Box paddingInline={2}>
          <LocalBreadcrumbs crumbs={crumbs} mobileLayout={!matchesDesktop} />
        </mui.Box>
      </mui.Menu>
    </>
  );
}
