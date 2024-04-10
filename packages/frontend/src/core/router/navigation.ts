import { ReactNode } from "react";
import { Role, User } from "../types/User";

export type NavItemAnchorSecure = Role[] | ((user: User) => boolean | Role[]);

export type NavItemRender = {
  icon?: ReactNode;
  label: string;
};

export type NavItemAnchor = {
  path: string;
  secure?: NavItemAnchorSecure;
};

export type NavItemChildren = {
  children: NavItem[];
};

export type NavItemSingle = NavItemRender &
  NavItemAnchor & {
    variant?: "single";
  };

export type NavItemMultiple = NavItemRender &
  NavItemChildren & {
    variant: "group" | "menu";
  };

export type NavItem = NavItemSingle | NavItemMultiple;

export type NavItemList = NavItem[];
