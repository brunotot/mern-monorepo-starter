import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export function DatatableContainer({ children }: PropsWithChildren) {
  return <Paper>{children}</Paper>;
}
