import type { PaginationOptions } from "@org/lib-api-client";
import type { ReactNode } from "react";

export type DtBaseColumnAlign = "left" | "center" | "right";
export type DtBaseColumnRenderHeader = () => ReactNode;
export type DtBaseColumnRenderBody<T> = (value: T) => ReactNode;
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
  rowsPerPage: 10,
  search: "",
  filters: {},
};
