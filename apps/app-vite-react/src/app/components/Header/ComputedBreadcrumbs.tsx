import type { NavigationRouteHandle } from "@/server/route-typings";
import type { TODO } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { sigDirection } from "@/app/signals/sigDirection";
import { useTranslation } from "@/lib/i18next";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { type UIMatch, useMatches } from "react-router-dom";

export type NavigationCrumb = {
  match: UIMatch<unknown, unknown>;
  label: string;
};

function useNavigationCrumbs(): NavigationCrumb[] {
  const matches: UIMatch<unknown, unknown>[] = useMatches();
  const t = useTranslation();

  const crumbs: NavigationCrumb[] = useMemo(() => {
    const c: NavigationCrumb[] = [];
    for (const match of matches) {
      const handle = match.handle as NavigationRouteHandle;
      if (!handle?.crumb) continue;
      c.push({
        match: match,
        label: handle.crumb(t, match.params),
      });
    }
    return c;
  }, [t, matches]);

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
  const crumbs = useNavigationCrumbs();
  const matchesDesktop = mui.useMediaQuery("(min-width:678px)");
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
