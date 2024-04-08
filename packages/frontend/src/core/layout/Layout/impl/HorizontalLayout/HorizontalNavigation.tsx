import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Fragment } from "react";
import { ButtonHoverMenu } from "../../../../components/ButtonHoverMenu";
import { NavItem } from "../../../../router/navigation";
import { useNavData } from "../../../../router/useNavData";

export type HorizontalNavItemProps = {
  item: NavItem;
};

function HorizontalNavItem({ item }: HorizontalNavItemProps) {
  const hasChildren = "children" in item && item.children;
  const children = item?.children ?? [];

  if (hasChildren) {
    return (
      <ButtonHoverMenu
        renderButton={(hoverProps, popupState) => (
          <ListItemButton
            sx={{
              ...(popupState.isOpen && {
                backgroundColor: "action.hover",
              }),
            }}
            {...hoverProps}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: "2.125rem" }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} />
          </ListItemButton>
        )}
      >
        {children.map((child, index) => (
          <HorizontalNavItem item={child} key={index} />
        ))}
      </ButtonHoverMenu>
    );
  }

  return (
    <ListItemButton>
      {item.icon && (
        <ListItemIcon sx={{ minWidth: "2.125rem" }}>{item.icon}</ListItemIcon>
      )}
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
}

export function HorizontalNavigation() {
  const navData = useNavData();

  return (
    <List component={Stack} direction="row">
      {navData.map((item, index) => (
        <Fragment key={index}>
          <HorizontalNavItem item={item} />
        </Fragment>
      ))}
    </List>
  );
}
