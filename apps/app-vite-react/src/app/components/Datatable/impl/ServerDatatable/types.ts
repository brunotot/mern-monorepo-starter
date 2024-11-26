import type { DtBaseProps } from "@org/app-vite-react/app/components/Datatable/types";

export type ServerDatatableProps<T> = DtBaseProps<T, string> & {
  sync?: false;
  count: number;
};
