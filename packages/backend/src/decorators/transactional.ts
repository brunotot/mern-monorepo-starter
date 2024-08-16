import type { TODO } from "@org/shared";
import { InjectorMetadataManager } from "@org/backend/config/managers/InjectorMetadataManager";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";

type ClientSession = TODO;
const startSession = undefined as TODO;

function isClientSession(obj: TODO): obj is ClientSession {
  return (
    obj != null &&
    typeof obj === "object" &&
    typeof obj.startTransaction === "function" &&
    typeof obj.commitTransaction === "function" &&
    typeof obj.inTransaction === "function"
  );
}

export function transactional<This, Fn extends (...args: TODO[]) => TODO>(
  fn: Fn,
  context: ClassMethodDecoratorContext<This, Fn>,
) {
  const replacementMethod = async function (...args: TODO[]) {
    const lastArg = args.at(-1);
    const isTransactionActive = isClientSession(lastArg);
    const session = isTransactionActive ? lastArg : await startSession();
    !isTransactionActive && session.startTransaction();
    try {
      const container = InjectorMetadataManager.getBy(context).value.name;
      const _this = ServiceRegistry.getInstance().inject(container);
      const result = isTransactionActive
        ? await fn.call(_this, ...args)
        : await fn.call(_this, ...args, session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      !isTransactionActive && (await session.abortTransaction());
      throw error;
    } finally {
      !isTransactionActive && session.endSession();
    }
  };

  return replacementMethod;
}
