import { RoutesMetaService } from "../meta/RoutesMetaService";
import { Class } from "../utils/types";
import { Injectable } from "./Injectable";

export function Controller<This extends Class>(basePath: string) {
  return Injectable<This>((context) => {
    RoutesMetaService.from(context).setBasePath(basePath);
  });
}
