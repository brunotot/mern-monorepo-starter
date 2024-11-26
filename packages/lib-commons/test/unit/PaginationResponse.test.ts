import { PaginationResponse } from "@/app/PaginationResponse";

describe("PaginationResponse", () => {
  it("should validate a correct response structure", () => {
    const validResponse = {
      data: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ],
      totalPages: 75,
      totalElements: 741,
      rowsPerPage: 10,
      page: 0,
    };

    const result = PaginationResponse.parse(validResponse);

    expect(result).toEqual(validResponse);
  });

  it("should throw an error for missing required fields", () => {
    const invalidResponse = {
      data: [{ id: 1, name: "Item 1" }],
      totalPages: 75,
      totalElements: 741,
      rowsPerPage: 10,
      // Missing `page`
    };

    expect(() => PaginationResponse.parse(invalidResponse)).toThrow();
  });

  it("should throw an error for invalid field types", () => {
    const invalidResponse = {
      data: [{ id: 1, name: "Item 1" }],
      totalPages: "seventy-five", // Invalid type
      totalElements: 741,
      rowsPerPage: 10,
      page: 0,
    };

    expect(() => PaginationResponse.parse(invalidResponse)).toThrow();
  });

  it("should validate with an empty data array", () => {
    const validResponse = {
      data: [],
      totalPages: 0,
      totalElements: 0,
      rowsPerPage: 10,
      page: 0,
    };

    const result = PaginationResponse.parse(validResponse);

    expect(result).toEqual(validResponse);
  });
});
