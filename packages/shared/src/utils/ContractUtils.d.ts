import { type generateOpenApi } from "@ts-rest/open-api";
import { z } from "zod";
export type OperationMapper = NonNullable<Parameters<typeof generateOpenApi>[2]>["operationMapper"];
export declare const META_TAGS_KEY = "openApiTags";
export declare function buildPathFn<C extends string>(
  context: C,
): <P extends string>(path?: P) => `/${C}${P}`;
export declare function buildRouteMetadata(tag: string): {
  openApiTags: string[];
};
export declare function hasCustomTags(metadata: unknown): metadata is {
  [META_TAGS_KEY]: string[];
};
export declare const operationMapper: OperationMapper;
export declare const ZOD_ERROR_ANY: z.ZodObject<
  z.objectUtil.extendShape<
    {
      details: z.ZodString;
      status: z.ZodNumber;
      message: z.ZodString;
      path: z.ZodString;
      timestamp: z.ZodString;
      metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
    },
    {}
  >,
  "strip",
  z.ZodTypeAny,
  {
    path: string;
    message: string;
    status: number;
    details: string;
    timestamp: string;
    metadata: Record<string, any>;
  },
  {
    path: string;
    message: string;
    status: number;
    details: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
>;
export declare function buildDefaultResponses(): {
  readonly 500: z.ZodObject<
    {
      details: z.ZodString;
      status: z.ZodNumber;
      message: z.ZodString;
      path: z.ZodString;
      timestamp: z.ZodString;
      metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
    },
    "strip",
    z.ZodTypeAny,
    {
      path: string;
      message: string;
      status: number;
      details: string;
      timestamp: string;
      metadata: Record<string, any>;
    },
    {
      path: string;
      message: string;
      status: number;
      details: string;
      timestamp: string;
      metadata: Record<string, any>;
    }
  >;
};
//# sourceMappingURL=ContractUtils.d.ts.map
