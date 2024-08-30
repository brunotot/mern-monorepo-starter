import type { PaginationOptions } from "@org/shared";
import type { DtBaseColumn } from "@org/frontend/components/semantics/Datatable/types";

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
