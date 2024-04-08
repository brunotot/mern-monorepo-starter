import { createMethodDecorator } from "@tsvdec/decorators";
import { ClientSession, startSession } from "mongoose";
import { inject } from "../config";
import { InjectionMetaService } from "../meta/InjectionMetaService";

function isClientSession(obj: any): obj is ClientSession {
  return (
    obj != null &&
    typeof obj === "object" &&
    typeof obj.startTransaction === "function" &&
    typeof obj.commitTransaction === "function" &&
    typeof obj.inTransaction === "function"
  );
}

export function Transactional<
  This,
  Fn extends (...args: any[]) => Promise<any>
>() {
  return createMethodDecorator(({ target: fn, meta }) => {
    const context = meta.context;
    const replacementMethod = async function (...args: any[]) {
      const lastArg = args.at(-1);
      const isTransactionActive = isClientSession(lastArg);
      const session = isTransactionActive ? lastArg : await startSession();
      !isTransactionActive && session.startTransaction();
      try {
        const container = InjectionMetaService.from(context).value.name;
        const _this = inject(container);
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
