import type { PaginationOptions } from "@org/lib-commons";
import type { DtBaseColumn } from "@org/app-vite-react/components/semantics/Datatable/types";

export type DtServerColumn<T> = DtBaseColumn<T> & {
  sort?: string;
};

export type ServerDatatableProps<T> = {
  data: T[];
  columns: DtServerColumn<T>[];
  keyMapper: (value: T) => string;
  count: number;
  paginationOptions: PaginationOptions;
  onPaginationOptionsChange: (paginationOptions: PaginationOptions) => void;
};
