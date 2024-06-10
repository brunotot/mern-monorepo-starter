import { RowType } from "./dt-table.types";

export type Values<T> = T[keyof T];

export type DtColumnDef<T> = Values<{
  [Prop in keyof T]: DtColumnDefRaw<T, Prop>;
}>;

export type DtColumnDefRaw<T = RowType, K extends keyof T = keyof T> = {
  id: K;
  label: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  minWidth?: number | string;
  width?: number | string;
  textual?: (value: T[K], wrapper: T) => string;
  render?: (value: T[K], wrapper: T) => React.ReactNode;
};
