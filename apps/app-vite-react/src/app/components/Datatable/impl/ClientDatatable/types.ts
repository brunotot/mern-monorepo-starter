import type { DtBaseProps } from "@org/app-vite-react/app/components/Datatable/types";

export type ClientDatatableProps<T> = DtBaseProps<T, (o1: T, o2: T) => number> & {
  sync: true;
  disablePagination?: boolean;
};
