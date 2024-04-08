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
import { Fragment } from "react/jsx-runtime";
import { NavItem } from "./navigation";
import { useNavData } from "./useNavData";

/*function SidebarNavItem({ icon, label }: SidebarNavItemProps) {
  return (
    <ListItemButton
      sx={{
        paddingLeft: "1.5rem",
        borderTopRightRadius: "2rem",
        borderBottomRightRadius: "2rem",
      }}
      selected={label === "Account Settings"}
      onClick={() => {}}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: "2.125rem" }}>{icon}</ListItemIcon>
      )}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}*/

export type SidebarNavItemProps = {
  item: NavItem;
  indent?: number;
};

function SidebarNavItem({ item, indent = 0 }: SidebarNavItemProps) {
  const hasChildren = "children" in item && item.children;
  const dropdown = item?.dropdown ?? "menu";
  const renderChildrenPersistent = hasChildren && dropdown === "persistent";
  const renderChildrenMenu = hasChildren && dropdown === "menu";
  const children = item?.children ?? [];
  const [open, setOpen] = useState(false);

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
          {item.icon && (
            <ListItemIcon sx={{ minWidth: "2.125rem" }}>
              {item.icon}
            </ListItemIcon>
          )}
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

  return (
    <ListItemButton
      sx={{
        paddingLeft: `calc(1.5rem + ${indent}rem)`,
        borderTopRightRadius: "2rem",
        borderBottomRightRadius: "2rem",
      }}
      selected={item.label === "Account Settings"}
      onClick={() => {}}
    >
      {item.icon && (
        <ListItemIcon sx={{ minWidth: "2.125rem" }}>{item.icon}</ListItemIcon>
      )}
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
}

export function SidebarNavContent() {
  const navData = useNavData();

  return (
    <List sx={{ paddingRight: "1.75rem !important" }}>
      {navData.map((item, index) => (
        <SidebarNavItem key={index} item={item} />
      ))}
    </List>
  );
}
