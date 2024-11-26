import {
  type ServerDatatableProps,
  type ClientDatatableProps,
  ClientDatatable,
  ServerDatatable,
} from "./impl";

export type DatatableProps<T> = ServerDatatableProps<T> | ClientDatatableProps<T>;

export function Datatable<T>(props: DatatableProps<T>) {
  if (props.sync) return <ClientDatatable {...props} />;
  return <ServerDatatable {...props} />;
}
