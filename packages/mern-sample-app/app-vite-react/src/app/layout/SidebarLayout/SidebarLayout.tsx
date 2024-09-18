import type * as RouteTypes from "@org/app-vite-react/route-typings";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from "@org/app-vite-react/lib/i18next";
import { reactServer } from "@org/app-vite-react/server";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";

import { isAnyRouteActive } from "../Layout";

export type SidebarNavItemProps = {
  item: RouteTypes.NavigationRoute;
  indent?: number;
};

function SidebarNavItem({ item, indent = 0 }: SidebarNavItemProps) {
  const hasChildren = item.variant !== "single";
  const renderChildrenPersistent = hasChildren && item.variant === "group";
  const renderChildrenMenu = hasChildren && item.variant === "menu";
  const children: RouteTypes.NavigationRoute[] = hasChildren ? item.children : [];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  if (renderChildrenPersistent) {
    return (
      <Fragment>
        <Divider
          sx={{
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

  if (renderChildrenMenu) {
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

  const itemSingle = item as RouteTypes.NavigationRouteItem;

  if (itemSingle.hidden === true) {
    return <></>;
  }

  return (
    <ListItemButton
      sx={{
        paddingLeft: `calc(1.5rem + ${indent}rem)`,
        borderTopRightRadius: "2rem",
        borderBottomRightRadius: "2rem",
      }}
      selected={location.pathname === itemSingle.path}
      onClick={() => navigate(itemSingle.path)}
    >
      {itemSingle.icon && <ListItemIcon>{itemSingle.icon}</ListItemIcon>}
      <ListItemText primary={itemSingle.label(t)} />
    </ListItemButton>
  );
}

export function SidebarLayout() {
  return (
    <List dense sx={{ paddingRight: "1.75rem !important" }}>
      {reactServer.routes.map((item, index) => (
        <SidebarNavItem key={index} item={item} />
      ))}
    </List>
  );
}
