import { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";

export function useThemeContext() {
  const value = useContext(ThemeContext);
  if (!value)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return value;
}
