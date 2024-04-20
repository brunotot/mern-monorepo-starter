import { OpenApiZodAny, generateSchema } from "@anatine/zod-openapi";
import { TODO } from "@org/shared";
import { SchemaObject } from "openapi3-ts/oas31";

/**
 * Recursively iterate over keys of generated and its children values if object and convert all keys which are "type" from array of strings to just a string on zeroth index in array
 */
function generateSwaggerSchema(schema: OpenApiZodAny): SchemaObject {
  const generated = generateSchema(schema);
  const iterate = (obj: TODO) => {
    for (const key in obj) {
      if (key === "type" && Array.isArray(obj[key]) && obj[key].length === 1) {
        obj[key] = obj[key][0];
      } else if (typeof obj[key] === "object") {
        iterate(obj[key]);
      }
    }
  };
  iterate(generated);
  return generated;
}

export function buildSwaggerBody(schema: TODO) {
  return {
    content: {
      "application/json": {
        schema: generateSwaggerSchema(schema),
      },
    },
  };
}
