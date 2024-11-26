import type { Breakpoint } from "@mui/material";
import type * as RouteTypes from "@org/app-vite-react/server/route-typings";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import * as mui from "@mui/material";
import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { useTranslation } from "@org/app-vite-react/lib/i18next";
import { reactServer } from "@org/app-vite-react/server/server";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonHoverMenu, type OriginPosition } from "./ButtonHoverMenu";
import { isAnyRouteActive } from "../Layout";

export type HorizontalNavItemProps = {
  item: RouteTypes.NavigationRoute & { accumulatedPath: string };
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
  const t = useTranslation();
  const navigate = useNavigate();
  const hasChildren = item.variant !== "single";
  const children: RouteTypes.NavigationRoute[] = hasChildren ? item.children : [];
  const isMainNavButton = dropdownPosition.anchorY === "bottom";
  const borderRadius = isMainNavButton ? 1 : undefined;

  if (item.hidden === true) {
    if (item.variant === "single") return <></>;
    return (
      <Fragment>
        {children.map((subItem, subIndex) => (
          <HorizontalNavItem
            key={subIndex}
            item={{ ...subItem, accumulatedPath: `${item.accumulatedPath}/${subItem.path}` }}
          />
        ))}
      </Fragment>
    );
  }

  if (item.variant !== "single") {
    const isAnyRouteActiveInGroup = isAnyRouteActive(children);
    return (
      <ButtonHoverMenu
        position={dropdownPosition}
        renderButton={(hoverProps, popupState) => (
          <mui.ListItemButton
            selected={isMainNavButton ? isAnyRouteActiveInGroup : undefined}
            sx={{
              flexGrow: 0,
              whiteSpace: "nowrap",
              outline: isMainNavButton && isAnyRouteActiveInGroup ? "1px solid gray" : undefined,
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
            {item.icon && <mui.ListItemIcon>{item.icon}</mui.ListItemIcon>}
            <mui.ListItemText primary={item.label(t)} />
            <mui.ListItemIcon sx={{ minWidth: 0 }}>
              {isMainNavButton ? <ExpandMore /> : <ChevronRight />}
            </mui.ListItemIcon>
          </mui.ListItemButton>
        )}
      >
        {children.map((child, index) => (
          <HorizontalNavItem
            item={{ ...child, accumulatedPath: `${item.accumulatedPath}/${child.path}` }}
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

  const removeTrailingslash = (str: string) => {
    if (str === "/") return str;
    return str.endsWith("/") ? str.slice(0, -1) : str;
  };
  const path = removeTrailingslash(
    item.accumulatedPath.startsWith("/") ? item.accumulatedPath : `/${item.accumulatedPath}`,
  );
  const locationPathname = removeTrailingslash(
    location.pathname.startsWith("/") ? location.pathname : `/${location.pathname}`,
  );
  const isSelected = path === "/" ? locationPathname === path : locationPathname.startsWith(path);

  return (
    <mui.ListItemButton
      sx={{
        flexGrow: 0,
        borderRadius,
        whiteSpace: "nowrap",
        outline: isSelected ? "1px solid gray" : undefined,
      }}
      selected={isSelected}
      onClick={() => navigate(item.path)}
    >
      {item.icon && <mui.ListItemIcon>{item.icon}</mui.ListItemIcon>}
      <mui.ListItemText primary={item.label(t)} />
    </mui.ListItemButton>
  );
}

export type HorizontalNavVariantProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  hidden?: boolean;
};

export function HorizontalLayout({
  backgroundColor,
  maxWidth = false,
  hidden = false,
}: HorizontalNavVariantProps) {
  if (hidden) return <></>;
  return (
    <mui.Box
      data-driver="navigation"
      sx={{
        backgroundColor,
      }}
      paddingBlock={1}
    >
      <mui.Container sx={{ paddingInline: `0 !important` }} maxWidth={maxWidth}>
        <mui.List dense component={mui.Stack} direction="row">
          {reactServer.routes.map((item, index) => {
            let isAuthorized = true;
            if (item.secure) {
              isAuthorized = item.secure(sigUser.value);
            }
            return (
              <Fragment key={index}>
                {isAuthorized && (
                  <HorizontalNavItem item={{ ...item, accumulatedPath: item.path }} />
                )}
              </Fragment>
            );
          })}
        </mui.List>
      </mui.Container>
    </mui.Box>
  );
}
