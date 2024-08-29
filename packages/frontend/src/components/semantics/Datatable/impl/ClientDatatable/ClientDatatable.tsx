import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { TODO } from "@org/shared";
import { Fragment, MouseEvent, useMemo, useState } from "react";
import { DtSortableCell } from "@org/frontend/components/semantics/Datatable/components/DtSortableCell/DtSortableCell";
import {
  DEFAULT_PAGINATION_OPTIONS,
  DtBaseOrder,
} from "@org/frontend/components/semantics/Datatable/types";
import { ClientDatatableProps } from "@org/frontend/components/semantics/Datatable/impl/ClientDatatable/types";

export function ClientDatatable<T>({
  data,
  columns,
  disablePagination = false,
}: ClientDatatableProps<T>) {
  const [sortData, setSortData] = useState<DtBaseOrder>([]);
  const [paginationOptions, setPaginationOptions] = useState(DEFAULT_PAGINATION_OPTIONS);

  const onPageChange = (newPage: number) => {
    setPaginationOptions({ ...paginationOptions, page: newPage });
  };

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setPaginationOptions({ ...paginationOptions, rowsPerPage: newRowsPerPage });
  };

  const filteredData = useMemo(() => {
    if (disablePagination) return data;
    const { page, rowsPerPage } = paginationOptions;
    let localData = data;
    if (sortData.length > 0) {
      localData = [...data].sort((a, b) => {
        for (const sortProps of sortData) {
          const { id, direction } = sortProps;
          const column = columns.find(v => v.id === id);
          if (!column || !column.sort) continue;
          const sortValue = column.sort(a, b);
          if (sortValue !== 0) return direction === "asc" ? sortValue : -sortValue;
        }
        return 0;
      });
    }
    return localData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [data, paginationOptions, disablePagination, sortData]);

  const onSortColumnClick = (id: string, event: MouseEvent<TODO>) => {
    console.log(event);
    const sortIndex = sortData.findIndex(v => v.id === id);
    if (sortIndex < 0) {
      setSortData([{ id, direction: "asc" }]);
      return;
    }
    const sortProps = sortData[sortIndex];
    const oldDirection = sortProps.direction;
    if (oldDirection === "desc") {
      setSortData([]);
      return;
    }
    setSortData([{ id, direction: "desc" }]);
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
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
            {filteredData.map((item, i) => (
              <TableRow
                hover
                key={i + paginationOptions.page * paginationOptions.rowsPerPage}
                role="checkbox"
                tabIndex={-1}
              >
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
      {!disablePagination && (
        <TablePagination
          component="div"
          labelRowsPerPage="Results per page:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} to ${count}`}
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={data.length}
          page={paginationOptions.page}
          rowsPerPage={paginationOptions.rowsPerPage}
          showFirstButton
          showLastButton
          onPageChange={(_, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={e => onRowsPerPageChange(+e.target.value)}
          classes={{ toolbar: "toolbar-class" }}
        />
      )}
    </>
  );
}
