/**
 * @packageDocumentation
 *
 * ## Overview
 * This module defines classes to manage and store metadata for decorators in JavaScript/TypeScript using a Stage 3 decorators polyfill.
 * It provides utility classes `DecoratorMetadata` and `DecoratorMetadataEntry` to handle metadata association with classes or functions
 * in a structured way, ensuring that metadata is correctly stored and retrieved across different parts of an application.
 *
 * ## Features
 * - Adds and retrieves metadata for classes and functions.
 * - Uses Stage 3 decorator polyfill to support future decorator syntax.
 * - Provides `DecoratorMetadataEntry` to simplify state management with metadata.
 * - Supports both function-based and context-based metadata storage.
 *
 * ## How to Use
 * ```ts
 * import { DecoratorMetadata, DecoratorMetadataInjectType } from "@org/app-node-express/meta";
 *
 * class SomeClass {};
 *
 * // Using DecoratorMetadata
 *
 * const metadata = new DecoratorMetadata(SomeClass);
 * metadata.setValue('key', 'someValue');
 *
 * const newReference = new DecoratorMetadata(SomeClass);
 * console.log(newReference.getValue('key'));  // Outputs 'someValue'
 *
 * // Using DecoratorMetadataEntry
 *
 * class MyMetadata extends DecoratorMetadataEntry<string> {
 *   constructor(target: DecoratorMetadataInjectType) {
 *     super(target, () => "initialValue");
 *   }
 *
 *   writeCustomValue(value: string) {
 *      this.value = value;
 *   }
 * }
 *
 * const myMetadata = new MyMetadata(SomeClass);
 * myMetadata.writeCustomValue("foo");
 *
 * const newReference = new MyMetadata(SomeClass);
 * console.log(newReference.value);  // Outputs 'foo'
 * ```
 */

export * from "./DecoratorMetadata";
export * from "./DecoratorMetadataEntry";
