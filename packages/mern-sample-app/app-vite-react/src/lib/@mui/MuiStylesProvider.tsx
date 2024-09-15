import { StylesProvider } from "@mui/styles";
import type { PropsWithChildren } from "react";

export function MuiStylesProvider({ children }: PropsWithChildren) {
  return <StylesProvider injectFirst>{children}</StylesProvider>;
}
