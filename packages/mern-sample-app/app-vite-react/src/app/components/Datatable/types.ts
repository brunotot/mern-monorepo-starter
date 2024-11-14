import type { PaginationOptions } from "@org/lib-api-client";
import type { ReactNode } from "react";

export type DtBaseColumnConfig = {
  cleanup: () => void;
};
export type DtBaseColumnAlign = "left" | "center" | "right";
export type DtBaseColumnRenderHeader = () => ReactNode;
export type DtBaseColumnRenderBody<T> = (value: T, config: DtBaseColumnConfig) => ReactNode;
export type DtBaseOrder = DtBaseSortItem[];
export type DtBaseSortItem = { id: string; direction: "asc" | "desc" };
export type DtBaseColumn<T> = {
  id: string;
  align?: DtBaseColumnAlign;
  renderHeader: DtBaseColumnRenderHeader;
  renderBody: DtBaseColumnRenderBody<T>;
};

export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  order: [],
  page: 0,
  rowsPerPage: 5,
  search: "",
  filters: {},
};
