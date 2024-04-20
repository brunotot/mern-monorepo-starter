import { Class } from "@org/shared";
import { createClassDecorator } from "@tsvdec/decorators";
import express, { Router } from "express";
import { RouteDecoratorManager } from "../managers";
import { InjectionDecoratorManager } from "../managers/InjectionDecoratorManager";

const injectionClasses: Class[] = [];

export function getInjectionClasses() {
  return injectionClasses;
}

export function registerRoutes(app: express.Application) {
  getInjectionClasses().forEach(clazz => {
    const router = Router();
    const { basePath, routes } = RouteDecoratorManager.from(clazz).value;
    routes.forEach(({ method, path = "", middlewares, handler }) => {
      const fullPath = `${basePath}${path}`;
      const pipeline = middlewares ? [...middlewares, handler] : [handler];
      router[method](fullPath, ...pipeline);
    });
    app.use("/", router);
  });
}

export type ClassDecoratorSupplier = (context: DecoratorContext, constructor: Class) => void;

export function Injectable<This extends Class>(supplier?: ClassDecoratorSupplier) {
  return createClassDecorator<This>(({ clazz: constructor, meta }) => {
    const context = meta.context;
    const constructorName: string = constructor.name;
    const targetName = normalizeTargetName(constructorName);
    InjectionDecoratorManager.from(context).setName(targetName);
    injectionClasses.push(constructor);
    supplier?.(context, constructor);
  });
}

function normalizeTargetName(targetName: string) {
  const commonSuffix = "Impl";
  const targetNameLength = targetName.length;
  const targetNameSanitized = targetName.endsWith(commonSuffix)
    ? targetName.slice(0, targetNameLength - commonSuffix.length)
    : targetName;
  const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
  return uncapitalize(targetNameSanitized);
}
