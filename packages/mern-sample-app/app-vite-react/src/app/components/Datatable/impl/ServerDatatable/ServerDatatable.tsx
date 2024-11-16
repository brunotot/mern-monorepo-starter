import type { ServerDatatableProps } from "@org/app-vite-react/app/components/Datatable/impl/ServerDatatable/types";
import type { DtBaseSortItem } from "@org/app-vite-react/app/components/Datatable/types";
import type { MouseEvent } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { DtSortableCell } from "@org/app-vite-react/app/components/Datatable/components/DtSortableCell";
import { type TODO } from "@org/lib-commons";
import { Fragment, useCallback } from "react";

export function ServerDatatable<T>({
  data,
  columns,
  keyMapper,
  pagination,
  onPaginationChange,
  count,
}: ServerDatatableProps<T>) {
  const sortData =
    pagination?.order.map((order: TODO) => {
      const [id, direction] = order.split(" ");
      return { id, direction } as DtBaseSortItem;
    }) ?? [];

  const onPageChange = (newPage: number) => {
    onPaginationChange({ ...pagination, page: newPage });
  };

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    onPaginationChange({ ...pagination, rowsPerPage: newRowsPerPage });
  };

  const onSortColumnClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string, _event: MouseEvent<unknown>) => {
      //console.log(_event);
      const sortIndex = sortData.findIndex((v: TODO) => v.id === id);
      if (sortIndex < 0) {
        onPaginationChange({ ...pagination, order: [`${id} asc`] });
        return;
      }
      const sortProps = sortData[sortIndex];
      const oldDirection = sortProps.direction;
      if (oldDirection === "desc") {
        onPaginationChange({ ...pagination, order: [] });
        return;
      }
      onPaginationChange({ ...pagination, order: [`${id} desc`] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagination, sortData],
  );

  return (
    <>
      <TableContainer>
        <Table sx={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow>
              {columns.map(({ id, renderHeader, align, sort }) => {
                const sortIndex = sortData.findIndex((v: TODO) => v.id === id);
                const sortCount = sortData.length;
                const sortProps = sortData[sortIndex];
                const active = !!sortProps;
                const direction = sortProps?.direction ?? "asc";
                const priority = sortIndex + 1;
                return (
                  <Fragment key={id}>
                    {sort ? (
                      <DtSortableCell
                        id={id}
                        align={align}
                        renderHeader={renderHeader}
                        active={active}
                        direction={direction}
                        priority={sortCount < 2 ? undefined : priority}
                        onClick={onSortColumnClick}
                      />
                    ) : (
                      <TableCell align={align}>{renderHeader()}</TableCell>
                    )}
                  </Fragment>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow hover key={keyMapper(item)} role="checkbox" tabIndex={-1}>
                {columns.map(({ id, align, renderBody }) => (
                  <TableCell key={id} align={align}>
                    {renderBody(item, { cleanup: () => {} })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        labelRowsPerPage="Results per page:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} to ${count}`}
        rowsPerPageOptions={[10, 25, 50, 100]}
        count={count}
        page={pagination?.page ?? 0}
        rowsPerPage={pagination?.rowsPerPage ?? 0}
        showFirstButton
        showLastButton
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={e => onRowsPerPageChange(+e.target.value)}
        classes={{ toolbar: "toolbar-class" }}
      />
    </>
  );
}
