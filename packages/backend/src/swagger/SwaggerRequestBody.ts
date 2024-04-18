import { generateSchema } from "@anatine/zod-openapi";
import { TODO } from "@org/shared";

/**
 *
 * Recursively iterate over keys of generated and its children values if object and convert all keys which are "type" from array of strings to just a string on zeroth index in array
 */
function generateSwaggerSchema(schema: TODO): TODO {
  const generated = generateSchema(schema);
  const iterate = (obj: TODO) => {
    for (const key in obj) {
      if (key === "type") {
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
