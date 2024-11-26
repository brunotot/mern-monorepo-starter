import type { TODO } from "@/app/CommonUtils";

import { vi } from "vitest";

import { PaginationOptions } from "@/app/PaginationOptions";

vi.mock("@/JsonQueryParam", () => ({
  JsonQueryParam: vi.fn((schema: TODO) => ({
    openapi: vi.fn(() => ({
      schema,
    })),
  })),
}));

describe("PaginationOptions", () => {
  it("should validate with default values", () => {
    const result = PaginationOptions.parse({});
    expect(result).toEqual({
      page: 0,
      rowsPerPage: 10,
      order: [],
      search: "",
      filters: {},
    });
  });

  it("should validate and override default values when provided", () => {
    const result = PaginationOptions.parse({
      page: 2,
      rowsPerPage: 25,
      order: ["name asc"],
      search: "test search",
      filters: { active: true },
    });

    expect(result).toEqual({
      page: 2,
      rowsPerPage: 25,
      order: ["name asc"],
      search: "test search",
      filters: { active: true },
    });
  });

  it("should throw an error for invalid values", () => {
    expect(() => PaginationOptions.parse({ page: "invalid" })).toThrow();
    expect(() => PaginationOptions.parse({ rowsPerPage: "-1" })).toThrow();
    expect(() => PaginationOptions.parse({ order: "not-an-array" })).toThrow();
  });
});
