import { memo } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Skeleton } from "@mui/material";

export type DtSkeletonRowsProps = {
  rowsPerPage: number;
  columnsCount: number;
  height?: number;
};

function DtSkeletonRows({ rowsPerPage, columnsCount, height = 24 }: DtSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rowsPerPage }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: columnsCount }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton animation="pulse" height={height} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default memo(DtSkeletonRows);
