import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import {
  $AppConfig,
  NavigationRoute,
  NavigationRouteSingle,
} from "../../../../config";

export type SidebarNavItemProps = {
  item: NavigationRoute;
  indent?: number;
};

function SidebarNavItem({ item, indent = 0 }: SidebarNavItemProps) {
  const hasChildren = "children" in item && item.children;
  const variant = item?.variant ?? "single";
  const renderChildrenPersistent = hasChildren && variant === "group";
  const renderChildrenMenu = hasChildren && variant === "menu";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: NavigationRoute[] = (hasChildren ? item.children : []) as any;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
            paddingLeft:
              indent === 0 ? undefined : `calc(1.5rem + ${indent}rem)`,
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

  const itemSingle = item as NavigationRouteSingle;

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

export function SidebarNavContent() {
  const navData = $AppConfig.navigationRoutes;

  return (
    <List dense sx={{ paddingRight: "1.75rem !important" }}>
      {navData.map((item, index) => (
        <SidebarNavItem key={index} item={item} />
      ))}
    </List>
  );
}
