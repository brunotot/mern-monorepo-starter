import TableRow from "@mui/material/TableRow";
import { Key, memo, useCallback } from "react";
import { ctx } from "../../utils/contextMenu-utils";
import { DtActionList } from "../types/dt-action.types";
import { DtColumnDef } from "../types/dt-column.types";
import { DtIdentifier } from "../types/dt-table.types";
import DtActionsCell from "./DtActionsCell";
import DtDataCell from "./DtDataCell";
import { TODO } from "@org/shared";

export type DtDataRowsProps<T> = {
  actions: DtActionList<T>;
  identifier?: DtIdentifier<T>;
  rowsPerPage: number;
  page: number;
  data: T[];
  columnDefs: readonly DtColumnDef<T>[];
  getRowSeparator?: GetRowSeparatorType<T>;
};

const DEFAULT_GET_ROW_SEPARATOR = {
  render: () => undefined,
  predicate: () => false,
} as TODO;

export type GetRowSeparatorType<T> = {
  render: (item: T) => string;
  predicate: (current: T, next: T) => boolean;
};

function DtDataRows<T>({
  data,
  actions,
  rowsPerPage,
  page,
  identifier,
  columnDefs,
  getRowSeparator = DEFAULT_GET_ROW_SEPARATOR,
}: DtDataRowsProps<T>) {
  const calculateRowSeparator = useCallback(
    (current: T, data: T[], index: number) =>
      data.findIndex(item => getRowSeparator.predicate(current, item)) === index
        ? getRowSeparator.render(current)
        : undefined,
    [],
  );

  return (
    <>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i, arr) => {
        return (
          <TableRow
            hover
            data-row-separator={calculateRowSeparator(row, arr, i)}
            role="checkbox"
            tabIndex={-1}
            key={identifier ? (row[identifier] as unknown as Key) : i}
            {...ctx("row", row)}
          >
            {actions.length > 0 && <DtActionsCell actions={actions} dataIndex={i} elem={row} />}
            {columnDefs.map(column => (
              <DtDataCell column={column} row={row} key={String(column.id)} />
            ))}
          </TableRow>
        );
      })}
    </>
  );
}

export default memo(DtDataRows) as typeof DtDataRows;
