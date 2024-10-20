import type * as RouteTypes from "@org/app-vite-react/route-typings";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { isAnyRouteActive } from "@org/app-vite-react/app/layout/Layout";
import { useTranslation } from "@org/app-vite-react/lib/i18next";
import { reactServer } from "@org/app-vite-react/server";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";

export type SidebarNavItemProps = {
  item: RouteTypes.NavigationRoute;
  indent?: number;
};

function SidebarNavItem({ item, indent = 0 }: SidebarNavItemProps) {
  const children: RouteTypes.NavigationRoute[] = item.variant !== "single" ? item.children : [];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  if (item.hidden === true) {
    return <></>;
  }

  if (item.variant === "group") {
    return (
      <Fragment>
        <Divider
          sx={{
            color: "var(--mui-palette-info-main)",
            marginTop: indent === 0 ? "1.75rem" : "0.25rem",
            marginBottom: indent === 0 ? "0.5rem" : "0.25rem",
            paddingLeft: indent === 0 ? undefined : `calc(1.5rem + ${indent}rem)`,
          }}
          textAlign="left"
        >
          {item.icon} {item.label(t)}
        </Divider>
        {children.map((subItem, subIndex) => (
          <SidebarNavItem key={subIndex} item={subItem} indent={indent} />
        ))}
      </Fragment>
    );
  }

  if (item.variant === "menu") {
    return (
      <Fragment>
        <ListItemButton
          sx={{
            paddingLeft: `calc(1.5rem + ${indent}rem)`,
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            backgroundColor: isAnyRouteActive(children)
              ? "var(--mui-palette-action-hover)"
              : undefined,
          }}
          onClick={handleClick}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label(t)} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children.map((subItem, subIndex) => (
            <SidebarNavItem key={subIndex} item={subItem} indent={indent + 1} />
          ))}
        </Collapse>
      </Fragment>
    );
  }

  const path = (item as RouteTypes.NavigationRouteItem).path;

  return (
    <ListItemButton
      sx={{
        paddingLeft: `calc(1.5rem + ${indent}rem)`,
        borderRadius: "0.5rem",
      }}
      selected={location.pathname === path}
      onClick={() => navigate(path)}
    >
      {item.icon && <ListItemIcon sx={{ minWidth: 24 }}>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.label(t)} />
    </ListItemButton>
  );
}

export function SidebarLayout({ gutterTop = false }: { gutterTop?: boolean }) {
  return (
    <List
      data-driver="navigation"
      dense
      sx={{
        marginTop: gutterTop ? 2.5 : undefined,
      }}
    >
      {reactServer.routes.map((item, index) => {
        let isAuthorized = true;
        if (item.secure) {
          isAuthorized = item.secure(sigUser.value);
        }
        return <Fragment key={index}>{isAuthorized && <SidebarNavItem item={item} />}</Fragment>;
      })}
    </List>
  );
}
