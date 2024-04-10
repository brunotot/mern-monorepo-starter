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
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useNavigationData } from "../../../../hooks/useNavigationData";
import {
  NavigationItem,
  NavigationItemSingle,
} from "../../../../router/navigation";

export type SidebarNavItemProps = {
  item: NavigationItem;
  indent?: number;
};

function SidebarNavItem({ item, indent = 0 }: SidebarNavItemProps) {
  const hasChildren = "children" in item && item.children;
  const variant = item?.variant ?? "single";
  const renderChildrenPersistent = hasChildren && variant === "group";
  const renderChildrenMenu = hasChildren && variant === "menu";
  const children = hasChildren ? item.children : [];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          {item.icon} {item.label}
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
          selected={item.label === "Account Settings"}
          onClick={handleClick}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
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

  const itemSingle = item as NavigationItemSingle;

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
      <ListItemText primary={itemSingle.label} />
    </ListItemButton>
  );
}

export function SidebarNavContent() {
  const navData = useNavigationData();

  return (
    <List dense sx={{ paddingRight: "1.75rem !important" }}>
      {navData.map((item, index) => (
        <SidebarNavItem key={index} item={item} />
      ))}
    </List>
  );
}
