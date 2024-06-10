import { useCallback, useMemo, useState } from "react";
import { DtColumnDef } from "../../core/roberto/datatable/types/dt-column.types";
import { DtDataFilter, DtSearchFilter } from "../../core/roberto/datatable/types/dt-table.types";

type UseDatatableProps<T> = {
  data: T[];
  columnDefs: readonly DtColumnDef<T>[];
  searchFilter?: DtSearchFilter<T>;
  dataFilter?: DtDataFilter<T>;
};

export default function useDatatable<T>({
  searchFilter,
  columnDefs,
  data,
  dataFilter = () => true,
}: UseDatatableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const searchChangeHandler = useCallback((value: string) => {
    setPage(0);
    setSearch(value);
  }, []);

  const rowsPerPageChangeHandler = useCallback((value: number) => {
    setRowsPerPage(value);
    setPage(0);
  }, []);

  const pageChangeHandler = useCallback((value: number) => {
    setPage(value);
  }, []);

  const searchFilterOrDefaultFn = useCallback(
    (item: T, search: string) => {
      if (searchFilter) {
        return searchFilter(item, search);
      }
      return columnDefs.some(({ render, textual, id }) => {
        const renderedValue: unknown = render?.(item[id], item);
        const value = textual
          ? textual(item[id], item)
          : render && typeof renderedValue === "string"
            ? renderedValue
            : String(item[id]);
        const valueLowerCase = value.toLocaleLowerCase();
        return valueLowerCase.includes(search.toLocaleLowerCase());
      });
    },
    [searchFilter],
  );

  const results = useMemo(() => {
    const res = data.filter(item => searchFilterOrDefaultFn(item, search) && dataFilter(item));
    return res;
  }, [data, search]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchFilterOrDefaultFn,
    results,
    changeHandler: {
      search: searchChangeHandler,
      rowsPerPage: rowsPerPageChangeHandler,
      page: pageChangeHandler,
    },
  } as const;
}
