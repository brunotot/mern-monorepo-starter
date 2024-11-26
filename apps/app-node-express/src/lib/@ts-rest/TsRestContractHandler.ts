import type { RouteHandler, RouteInput, RouteMiddlewareFactory } from "@/lib/@ts-rest";
import type { AppRoute } from "@org/lib-api-client";
import { getTypedError } from "@org/lib-api-client";
import { MongoDatabaseService } from "@org/lib-mongodb";
import { IocRegistry } from "@/lib/ioc";
import { log } from "@/lib/winston";

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
      log.error(typedError.stack);
      return { status: typedError.content.status, body: typedError.content };
    } finally {
      session.endSession();
    }
  };
}
