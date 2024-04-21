import { registerSchema } from "@internal";
import z from "zod";

const BasePageableResponse = z
  .object({
    content: z.array(z.any()),
    totalPages: z.number().openapi({ example: 75 }),
    totalElements: z.number().openapi({ example: 741 }),
    rowsPerPage: z.number().openapi({ example: 10 }),
    page: z.number().openapi({ example: 0 }),
  })
  .describe("PageableResponse");

registerSchema("PageableResponse", BasePageableResponse);

export function PageableResponse<T extends z.ZodType>(schema: T) {
  return BasePageableResponse.extend({
    // @ts-expect-error We know shape is a valid property
    content: z.array(schema).openapi({ items: schema.shape }),
  }).describe("");
}
