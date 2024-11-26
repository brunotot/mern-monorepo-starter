import { z } from "zod";

import { TypedPaginationResponse } from "@/app/TypedPaginationResponse";

describe("TypedPaginationResponse", () => {
  it("should create a schema extending PaginationResponse with typed data", () => {
    const itemSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    const typedPaginationResponse = TypedPaginationResponse(itemSchema);

    const validResponse = {
      data: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ],
      totalPages: 10,
      totalElements: 100,
      rowsPerPage: 10,
      page: 1,
    };

    const result = typedPaginationResponse.parse(validResponse);

    expect(result).toEqual(validResponse);
  });

  it("should throw an error if the data array does not match the schema", () => {
    const itemSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    const typedPaginationResponse = TypedPaginationResponse(itemSchema);

    const invalidResponse = {
      data: [{ id: "not-a-number", name: "Item 1" }], // Invalid `id`
      totalPages: 10,
      totalElements: 100,
      rowsPerPage: 10,
      page: 1,
    };

    expect(() => typedPaginationResponse.parse(invalidResponse)).toThrow();
  });

  it("should validate with an empty data array", () => {
    const itemSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    const typedPaginationResponse = TypedPaginationResponse(itemSchema);

    const validResponse = {
      data: [],
      totalPages: 0,
      totalElements: 0,
      rowsPerPage: 10,
      page: 0,
    };

    const result = typedPaginationResponse.parse(validResponse);

    expect(result).toEqual(validResponse);
  });
});
