import { useContext } from "react";
import { SidebarContext } from "./SidebarProvider";

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (!value)
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  return value;
}
