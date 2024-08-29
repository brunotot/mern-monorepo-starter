import { DtBaseColumn } from "@org/frontend/components/semantics/Datatable/types";

export type DtClientColumnSort<T> = (o1: T, o2: T) => number;

export type DtClientColumn<T> = DtBaseColumn<T> & {
  sort?: DtClientColumnSort<T>;
};

export type ClientDatatableProps<T> = {
  data: T[];
  columns: DtClientColumn<T>[];
  disablePagination?: boolean;
};
