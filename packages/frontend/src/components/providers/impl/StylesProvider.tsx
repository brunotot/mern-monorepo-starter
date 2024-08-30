import { StylesProvider as InternalStylesProvider } from "@mui/styles";
import type { PropsWithChildren } from "react";

export function StylesProvider({ children }: PropsWithChildren) {
  return <InternalStylesProvider injectFirst>{children}</InternalStylesProvider>;
}
