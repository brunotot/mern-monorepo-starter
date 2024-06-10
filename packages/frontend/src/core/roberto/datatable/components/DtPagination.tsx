import { LabelDisplayedRowsArgs, TablePagination } from "@mui/material";
import React from "react";

const ROWS_PER_PAGE = [10, 25, 50, 100];
const getLabelDisplayedRows = (
  loading: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { from: _from, to: _to, count: _count }: LabelDisplayedRowsArgs,
) => {
  const localizedMessage =
    /*TODO useLocalizedMessage("datatable.paginatedResults", {
    from,
    to,
    count,
  })*/ "TODO, CHANGE ME";

  return loading ? "" : localizedMessage;
};

export type DtPaginationProps = {
  loading: boolean;
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (value: number) => void;
  onRowsPerPageChange: (value: number) => void;
};

function DtPagination({
  loading,
  page,
  count,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: DtPaginationProps) {
  return (
    <TablePagination
      component="div"
      labelDisplayedRows={p => getLabelDisplayedRows(loading, p)}
      labelRowsPerPage={"resultsPerPage TODO CHANGE"}
      rowsPerPageOptions={loading ? [] : ROWS_PER_PAGE}
      count={count}
      rowsPerPage={rowsPerPage}
      showFirstButton
      showLastButton
      page={page}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onRowsPerPageChange={e => onRowsPerPageChange(+e.target.value)}
      classes={{ toolbar: "flex-wrap justify-center sm:flex-nowrap sm:justify-end" }}
    />
  );
}

export default React.memo(DtPagination) as typeof DtPagination;
