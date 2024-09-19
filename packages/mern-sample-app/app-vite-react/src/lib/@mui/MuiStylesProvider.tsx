import type { PropsWithChildren } from "react";

import { StylesProvider } from "@mui/styles";

export function MuiStylesProvider({ children }: PropsWithChildren) {
  return <StylesProvider injectFirst>{children}</StylesProvider>;
}
