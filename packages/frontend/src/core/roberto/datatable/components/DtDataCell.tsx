import { memo } from "react";
import { toFixed } from "../../utils/currency-utils";
import { TableCell, Typography } from "@mui/material";
import { DtColumnDef } from "../types/dt-column.types";

export type DtDataCellProps<T> = {
  row: T;
  column: DtColumnDef<T>;
};

function DtDataCell<T>({ row, column }: DtDataCellProps<T>) {
  const value = row[column.id];
  const isValueNumber = typeof value === "number";
  const title = isValueNumber ? toFixed(value) : value;
  return (
    <TableCell className={`col-${String(column.id)}`} align={column.align} title={String(title)}>
      <Typography className="line-clamp-1">
        {/* @ts-expect-error Fix later! */}
        {column.render ? column.render(value, row) : value}
      </Typography>
    </TableCell>
  );
}

export default memo(DtDataCell) as typeof DtDataCell;
