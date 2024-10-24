import type {
  RouteHandler,
  RouteInput,
  RouteMiddlewareFactory,
} from "@org/app-node-express/lib/@ts-rest";
import type { AppRoute } from "@org/lib-api-client";

import { IocRegistry } from "@org/app-node-express/ioc";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { getTypedError } from "@org/lib-api-client";

export type ContractEndpointProps<Route extends AppRoute, This, Fn extends RouteHandler<Route>> = {
  contract: Route;
  middleware: RouteMiddlewareFactory[];
  target: Fn;
  context: ClassMethodDecoratorContext<This, Fn>;
};

export function createContractHandler<
  const Route extends AppRoute,
  This,
  Fn extends RouteHandler<Route>,
>({ context, target }: ContractEndpointProps<Route, This, Fn>) {
  return async function (data: unknown): Promise<unknown> {
    const databaseService = MongoDatabaseService.getInstance();
    const session = databaseService.client.startSession();
    try {
      databaseService.startTransaction(session);
      const container = IocRegistry.getInstance().inject(context);
      const result = await target.call(container, data as RouteInput<Route>);
      await databaseService.commitTransaction(session);
      return result;
    } catch (error: unknown) {
      await databaseService.rollbackTransaction(session);
      const typedError = getTypedError(error);
      return { status: typedError.content.status, body: typedError.content };
    } finally {
      session.endSession();
    }
  };
}
