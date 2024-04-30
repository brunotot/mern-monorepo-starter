import { type RequestRoute } from "@models/locals/RequestRoute";

export type RoutesMetaItem = {
  basePath: string;
  routes: RequestRoute[];
};
