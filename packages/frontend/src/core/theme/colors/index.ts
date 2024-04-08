import { AquaDarkColorSchema } from "./AquaDarkColorSchema";
import { DeepPurpleColorSchema } from "./DeepPurpleColorSchema";
import { OrientColorSchema } from "./OrientColorSchema";
import { PureLightColorSchema } from "./PureLightColorSchema";

export type ThemeColorSchema = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

export const ColorSchemaData = {
  AquaDarkColorSchema,
  DeepPurpleColorSchema,
  OrientColorSchema,
  PureLightColorSchema,
} as const satisfies Record<string, ThemeColorSchema>;

export type ColorSchemaName = keyof typeof ColorSchemaData;

export const DEFAULT_COLOR_SCHEMA_NAME: ColorSchemaName = "AquaDarkColorSchema";
