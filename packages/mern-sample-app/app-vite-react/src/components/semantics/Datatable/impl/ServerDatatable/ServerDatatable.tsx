import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import type { TODO } from "@org/lib-commons";
import type { MouseEvent } from "react";
import { Fragment, useCallback } from "react";
import type { ServerDatatableProps } from "@org/app-vite-react/components/semantics/Datatable/impl/ServerDatatable/types";
import type { DtBaseSortItem } from "@org/app-vite-react/components/semantics/Datatable/types";
import { DtSortableCell } from "@org/app-vite-react/components/semantics/Datatable/components/DtSortableCell";

export function ServerDatatable<T>({
  data,
  columns,
  keyMapper,
  paginationOptions,
  onPaginationOptionsChange,
  count,
}: ServerDatatableProps<T>) {
  const sortData =
    paginationOptions?.order.map(order => {
      const [id, direction] = order.split(" ");
      return { id, direction } as DtBaseSortItem;
    }) ?? [];

  const onPageChange = (newPage: number) => {
    onPaginationOptionsChange({ ...paginationOptions, page: newPage });
  };

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    onPaginationOptionsChange({ ...paginationOptions, rowsPerPage: newRowsPerPage });
  };

  const onSortColumnClick = useCallback(
    (id: string, event: MouseEvent<TODO>) => {
      console.log(event);
      const sortIndex = sortData.findIndex(v => v.id === id);
      if (sortIndex < 0) {
        onPaginationOptionsChange({ ...paginationOptions, order: [`${id} asc`] });
        return;
      }
      const sortProps = sortData[sortIndex];
      const oldDirection = sortProps.direction;
      if (oldDirection === "desc") {
        onPaginationOptionsChange({ ...paginationOptions, order: [] });
        return;
      }
      onPaginationOptionsChange({ ...paginationOptions, order: [`${id} desc`] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationOptions, sortData],
  );

  return (
    <>
      <TableContainer>
        <Table sx={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow>
              {columns.map(({ id, renderHeader, align, sort }) => {
                const sortIndex = sortData.findIndex(v => v.id === id);
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
                    {renderBody(item)}
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
        page={paginationOptions?.page ?? 0}
        rowsPerPage={paginationOptions?.rowsPerPage ?? 0}
        showFirstButton
        showLastButton
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={e => onRowsPerPageChange(+e.target.value)}
        classes={{ toolbar: "toolbar-class" }}
      />
    </>
  );
}
