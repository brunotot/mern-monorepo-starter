import type { DtBaseProps } from "@/app/components/Datatable/types";

export type ServerDatatableProps<T> = DtBaseProps<T, string> & {
  sync?: false;
  count: number;
};
