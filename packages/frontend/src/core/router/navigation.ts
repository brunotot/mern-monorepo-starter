import { ReactNode } from "react";
import { Role, User } from "../types/User";

export type NavigationItemAnchorSecure =
  | Role[]
  | ((user: User) => boolean | Role[]);

export type NavigationItemRender = {
  icon?: ReactNode;
  label: string;
};

export type NavigationItemAnchor = {
  path: string;
  secure?: NavigationItemAnchorSecure;
};

export type NavigationItemChildren = {
  children: NavigationItem[];
};

export type NavigationItemSingle = NavigationItemRender &
  NavigationItemAnchor & {
    variant?: "single";
  };

export type NavigationItemMultiple = NavigationItemRender &
  NavigationItemChildren & {
    variant: "group" | "menu";
  };

export type NavigationItem = NavigationItemSingle | NavigationItemMultiple;

export type NavigationData = NavigationItem[];
