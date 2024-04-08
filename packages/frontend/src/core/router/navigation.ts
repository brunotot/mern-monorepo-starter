import { ReactNode } from "react";

export type NavItem = {
  icon?: ReactNode;
  label: string;
  children?: NavItem[];
  dropdown?: "persistent" | "menu";
};

export type NavItemList = NavItem[];
