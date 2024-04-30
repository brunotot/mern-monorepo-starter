import { type RouteHandler } from "@models";
import { type TODO, type Class } from "@org/shared";
import { type OperationObject } from "openapi3-ts/oas31";

export type UnwrapClass<C extends Class> = C extends new (...args: TODO[]) => infer T? T : never;

export type ExtractRouteMethods<C extends Class> = {
    [K in keyof UnwrapClass<C>]: UnwrapClass<C>[K] extends RouteHandler ? K : never
}[keyof UnwrapClass<C>];


export type ApiDocs<C extends Class> = Record<ExtractRouteMethods<C>, OperationObject>