import { type Class } from "@org/shared";

export type ClassDecoratorSupplier = (context: DecoratorContext, target: Class) => void;
