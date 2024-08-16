import { StylesProvider as InternalStylesProvider } from "@mui/styles";
import { PropsWithChildren } from "react";

export function StylesProvider({ children }: PropsWithChildren) {
  return <InternalStylesProvider injectFirst>{children}</InternalStylesProvider>;
}
