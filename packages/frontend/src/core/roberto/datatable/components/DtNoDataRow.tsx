import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { memo } from "react";

export type DtNoDataRowProps = {
  columnsCount: number;
  className?: string;
  text?: string;
};

function DtNoDataRow({ className = "h-[53px]", columnsCount, text: text0 }: DtNoDataRowProps) {
  const text = text0 ? text0 : /*TODO useLocalizedMessage("datatable.empty")*/ text0;
  return (
    <TableRow role="checkbox" tabIndex={-1}>
      <TableCell className={className} align="center" colSpan={columnsCount}>
        {text}
      </TableCell>
    </TableRow>
  );
}

export default memo(DtNoDataRow) as typeof DtNoDataRow;
