import { ChevronRight, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  ButtonHoverMenu,
  OriginPosition,
} from "../../../../components/ButtonHoverMenu";
import { $AppConfig, NavigationRoute } from "../../../../config";

export type HorizontalNavItemProps = {
  item: NavigationRoute;
  dropdownPosition?: OriginPosition;
};

function HorizontalNavItem({
  item,
  dropdownPosition = {
    anchorY: "bottom",
    anchorX: "left",
    transformY: "top",
    transformX: "left",
  },
}: HorizontalNavItemProps) {
  const { t } = useTranslation();
  const hasChildren = "children" in item && item.children;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: NavigationRoute[] = (hasChildren ? item.children : []) as any;
  const isMainNavButton = dropdownPosition.anchorY === "bottom";
  const borderRadius = isMainNavButton ? 8 : undefined;

  if (hasChildren) {
    return (
      <ButtonHoverMenu
        position={dropdownPosition}
        renderButton={(hoverProps, popupState) => (
          <ListItemButton
            sx={{
              flexGrow: 0,
              backgroundColor: popupState.isOpen ? "action.hover" : undefined,
              borderRadius,
            }}
            {...hoverProps}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label(t)} />
            <ListItemIcon sx={{ minWidth: 0 }}>
              {isMainNavButton ? <ExpandMore /> : <ChevronRight />}
            </ListItemIcon>
          </ListItemButton>
        )}
      >
        {children.map((child, index) => (
          <HorizontalNavItem
            item={child}
            key={index}
            dropdownPosition={{
              anchorX: "right",
              anchorY: "top",
              transformX: "left",
              transformY: "top",
            }}
          />
        ))}
      </ButtonHoverMenu>
    );
  }

  return (
    <ListItemButton sx={{ flexGrow: 0, borderRadius }}>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.label(t)} />
    </ListItemButton>
  );
}

export type HorizontalNavigationProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
};

export function HorizontalNavigation({
  backgroundColor,
  maxWidth = false,
}: HorizontalNavigationProps) {
  const navData = $AppConfig.navigationRoutes;

  return (
    <Box sx={{ backgroundColor }} paddingBlock={0.75}>
      <Container maxWidth={maxWidth}>
        <List dense component={Stack} direction="row">
          {navData.map((item, index) => (
            <Fragment key={index}>
              <HorizontalNavItem item={item} />
            </Fragment>
          ))}
        </List>
      </Container>
    </Box>
  );
}
