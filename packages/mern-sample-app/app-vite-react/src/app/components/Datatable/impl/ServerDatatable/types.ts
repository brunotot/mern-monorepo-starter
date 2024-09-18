import type { DtBaseColumn } from "@org/app-vite-react/app/components/Datatable/types";

import { type PaginationOptions } from "@org/lib-api-client";

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
