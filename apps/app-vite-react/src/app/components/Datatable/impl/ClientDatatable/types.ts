import type { DtBaseProps } from "@/app/components/Datatable/types";

export type ClientDatatableProps<T> = DtBaseProps<T, (o1: T, o2: T) => number> & {
  sync: true;
  disablePagination?: boolean;
};
