import { TableCell, TableHead, TableRow } from "@mui/material";
import { memo } from "react";
import { DtColumnDef } from "../types/dt-column.types";
import DtHeaderCell from "./DtHeaderCell";

export type DtHeadProps<T> = {
  columnDefs: readonly DtColumnDef<T>[];
  showActions: boolean;
};

function DtHead<T>({ columnDefs, showActions }: DtHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {showActions && <TableCell className="!w-28" />}
        {columnDefs.map(c => (
          <DtHeaderCell key={String(c.id)} column={c} />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default memo(DtHead) as typeof DtHead;
