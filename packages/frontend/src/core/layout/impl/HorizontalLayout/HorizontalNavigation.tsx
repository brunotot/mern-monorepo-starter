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
import { TODO } from "@org/shared";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ButtonHoverMenu,
  OriginPosition,
} from "../../../components/ButtonHoverMenu";
import {
  $FrontendAppConfig,
  NavigationRoute,
  NavigationRouteSingle,
  isAnyRouteActive,
} from "../../../config";

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
  const navigate = useNavigate();
  const hasChildren = "children" in item && item.children;
  const children: NavigationRoute[] = (
    hasChildren ? item.children : []
  ) as TODO;
  const isMainNavButton = dropdownPosition.anchorY === "bottom";
  const borderRadius = isMainNavButton ? 8 : undefined;

  if (hasChildren) {
    const isAnyRouteActiveInGroup = isAnyRouteActive(children);
    return (
      <ButtonHoverMenu
        position={dropdownPosition}
        renderButton={(hoverProps, popupState) => (
          <ListItemButton
            selected={isMainNavButton ? isAnyRouteActiveInGroup : undefined}
            sx={{
              flexGrow: 0,
              backgroundColor: popupState.isOpen
                ? "action.hover"
                : isAnyRouteActiveInGroup
                ? isMainNavButton
                  ? undefined
                  : "var(--mui-palette-action-hover)"
                : undefined,
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

  const itemSingle = item as NavigationRouteSingle;

  if (itemSingle.hidden === true) {
    return <></>;
  }

  return (
    <ListItemButton
      sx={{ flexGrow: 0, borderRadius }}
      selected={location.pathname === itemSingle.path}
      onClick={() => navigate(itemSingle.path)}
    >
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
  const navData = $FrontendAppConfig.navigationRoutes;

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
