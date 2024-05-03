import type { TODO } from "@org/shared";
import type { ClientSession } from "mongoose";
import { startSession } from "mongoose";
import { createMethodDecorator } from "@tsvdec/decorators";

import { Bottle, InjectableManager } from "@org/backend/config";

function isClientSession(obj: TODO): obj is ClientSession {
  return (
    obj != null &&
    typeof obj === "object" &&
    typeof obj.startTransaction === "function" &&
    typeof obj.commitTransaction === "function" &&
    typeof obj.inTransaction === "function"
  );
}

// TODO: Not working properly, fix later
export function Transactional() {
  return createMethodDecorator(({ target: fn, meta }) => {
    const context = meta.context;
    const replacementMethod = async function (...args: TODO[]) {
      const lastArg = args.at(-1);
      const isTransactionActive = isClientSession(lastArg);
      const session = isTransactionActive ? lastArg : await startSession();
      !isTransactionActive && session.startTransaction();
      try {
        const container = InjectableManager.from(context).value.name;
        const _this = Bottle.getInstance().inject(container);
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
  });
}
