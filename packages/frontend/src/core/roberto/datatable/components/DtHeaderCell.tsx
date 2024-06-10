import { TableCell } from "@mui/material";
import { memo, useMemo } from "react";
import { DtColumnDef } from "../types/dt-column.types";

export type DtHeaderCellProps<T> = {
  column: DtColumnDef<T>;
};

function DtHeaderCell<T>({ column }: DtHeaderCellProps<T>) {
  const tableCellCommonClass = "whitespace-nowrap";
  const style = useMemo(
    () => ({
      minWidth: column.minWidth,
      width: column.width,
    }),
    [],
  );

  return (
    <TableCell align={column.align} className={tableCellCommonClass} style={style}>
      {column.label}
    </TableCell>
  );
}

export default memo(DtHeaderCell) as typeof DtHeaderCell;
