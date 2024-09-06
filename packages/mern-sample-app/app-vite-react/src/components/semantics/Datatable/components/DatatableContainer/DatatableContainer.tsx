//import { Paper } from "@mui/material";
import { Card } from "@mui/material";
import type { PropsWithChildren } from "react";

export function DatatableContainer({ children }: PropsWithChildren) {
  //return <Paper>{children}</Paper>;
  return <Card elevation={3}>{children}</Card>;
}
