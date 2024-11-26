//import { Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

import { Card } from "@mui/material";

export function DatatableContainer({ children }: PropsWithChildren) {
  // return <>{children}</>;

  //return <Paper>{children}</Paper>;
  return <Card elevation={3}>{children}</Card>;
}
