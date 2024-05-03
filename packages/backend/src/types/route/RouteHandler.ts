import type { ContractName } from "@org/shared";
import type { RouteInput } from "@org/backend/types/route/RouteInput";
import type { RouteOutput } from "@org/backend/types/route/RouteOutput";

export type RouteHandler<Name extends ContractName> = (data: RouteInput<Name>) => RouteOutput<Name>;
