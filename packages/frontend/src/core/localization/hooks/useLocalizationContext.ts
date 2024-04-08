import { useContext } from "react";
import { LocalizationContext } from "../components/LocalizationProvider";

export function useLocalizationContext() {
  const value = useContext(LocalizationContext);
  if (!value)
    throw new Error(
      "useLocalizationContext must be used within a LocalizationProvider"
    );
  return value;
}
