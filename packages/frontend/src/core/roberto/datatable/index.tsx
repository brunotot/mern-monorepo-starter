/* eslint-disable @typescript-eslint/no-unused-vars */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { memo } from "react";
import useTableSizePreference, { SizePreference } from "../../../core/hooks/useTableSizePreference";
import RenderIf from "../common/RenderIf";
import DtDataRows, { GetRowSeparatorType } from "./components/DtDataRows";
import DtHead from "./components/DtHead";
import DtNoDataRow from "./components/DtNoDataRow";
import DtPagination from "./components/DtPagination";
import DtSkeletonRows from "./components/DtSkeletonRows";
import { DtActionList } from "./types/dt-action.types";
import { DtColumnDef } from "./types/dt-column.types";
import { DtDataFilter, DtIdentifier, DtSearchFilter, RowType } from "./types/dt-table.types";
import useDatatable from "../../hooks/useDatatable";

export type DatatableProps<T> = {
  data: T[];
  columnDefs: readonly DtColumnDef<T>[];
  identifier?: DtIdentifier<T>;
  actions?: DtActionList<T>;
  searchable?: boolean;
  getRowSeparator?: GetRowSeparatorType<T>;
  height?: number;
  autoHeight?: boolean;
  loading?: boolean;
  size?: SizePreference;
  searchFilter?: DtSearchFilter<T>;
  dataFilter?: DtDataFilter<T>;
  disablePagination?: boolean;
};

function Datatable<T extends RowType>({
  columnDefs,
  data = [],
  actions = [],
  identifier,
  searchFilter,
  dataFilter = () => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchable: _searchable,
  getRowSeparator,
  //autoHeight = false,
  //height,
  loading = false,
  size: size0,
  disablePagination = false,
}: DatatableProps<T>) {
  const [tableSizePreference] = useTableSizePreference();
  const size = size0 ? size0 : tableSizePreference;

  const { results, page, rowsPerPage, changeHandler } = useDatatable({
    data,
    columnDefs,
    searchFilter,
    dataFilter,
  });

  const showActions = actions.length > 0;
  const showNoDataRow = !loading && results.length === 0;
  const showResultRows = !loading && results.length > 0;
  const showSkeletonRows = loading;
  const columnsCount = columnDefs.length + (showActions ? 1 : 0);

  //const showSearchInput = !!searchable;
  //const paddingClass = disablePagination ? "!p-0" : "!p-4";
  //const paperClass = `overflow-hidden mb-2 flex flex-col gap-4 outline outline-1 outline-slate-300 ${paddingClass}`;

  /*const smallHeightClass = "max-h-[575px]";
  const mediumHeightClass = "max-h-[800px]";
  const containerStyle = useMemo(() => ({ height }), []);
  const containerClass = autoHeight
    ? ""
    : height
      ? ""
      : size === "small"
        ? smallHeightClass
        : mediumHeightClass;*/

  return (
    <>
      <Paper /*className={paperClass}*/>
        {/*showSearchInput && <DtSearch loading={loading} onChange={changeHandler.search} />*/}
        {/*<SuspenseLoader loading={loading} overlay>*/}
        <TableContainer /*style={containerStyle} className={containerClass}*/>
          <Table stickyHeader size={size}>
            <DtHead showActions={showActions} columnDefs={columnDefs} />
            <TableBody>
              <RenderIf test={showSkeletonRows}>
                <DtSkeletonRows rowsPerPage={rowsPerPage} columnsCount={columnsCount} />
              </RenderIf>

              <RenderIf test={showNoDataRow}>
                <DtNoDataRow columnsCount={columnsCount} />
              </RenderIf>

              <RenderIf test={showResultRows}>
                <DtDataRows<T>
                  actions={actions}
                  data={results}
                  columnDefs={columnDefs}
                  identifier={identifier}
                  getRowSeparator={getRowSeparator}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              </RenderIf>
            </TableBody>
          </Table>
        </TableContainer>
        {/*</SuspenseLoader>*/}

        {!disablePagination && (
          <DtPagination
            loading={loading}
            rowsPerPage={rowsPerPage}
            count={results.length}
            page={page}
            onPageChange={changeHandler.page}
            onRowsPerPageChange={changeHandler.rowsPerPage}
          />
        )}
      </Paper>
    </>
  );
}

export default memo(Datatable) as typeof Datatable;
