import { type TODO } from "@org/shared";
import { ClassMetadata } from "../shared/ClassMetadata";

export type MethodDecoratorSupplier<This, Fn extends (...args: TODO[]) => TODO> = (content: {
  meta: ClassMetadata;
  target: Fn;
}) => ReturnType<MethodDecoratorDef<This, Fn>>;

export type MethodDecoratorDef<This, Fn extends (...args: TODO[]) => TODO> = (
  target: Fn,
  context: ClassMethodDecoratorContext<This, Fn>,
) => void | undefined | Fn;

export function createMethodDecorator<This, Fn extends (...args: TODO[]) => TODO>(
  supplier: MethodDecoratorSupplier<This, Fn>,
): MethodDecoratorDef<This, Fn> {
  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    const meta = ClassMetadata.for(context);
    return supplier({ target, meta });
  };
}
