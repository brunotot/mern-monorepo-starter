import { useContext } from "react";
import { LayoutContext } from "./LayoutProvider.tsx";

export function useLayoutContext() {
  const value = useContext(LayoutContext);
  if (!value)
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  return value;
}
