import type { TODO } from "@org/lib-commons";
import type * as mongodb from "mongodb";

import { vi } from "vitest";

import { paginate } from "@/MongoPagination";

describe("paginate", () => {
  const mockCollection = {
    aggregate: vi.fn(),
  };

  const sampleData = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return paginated data with correct structure", async () => {
    // Mock aggregation result
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([
        {
          data: sampleData,
          totalElements: 2,
          totalPages: 1,
          rowsPerPage: 2,
          page: 0,
        },
      ]),
    });

    const result = await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"], {
      rowsPerPage: 2,
      page: 0,
      search: "Alice",
      order: ["name asc"],
      filters: { age: 30 },
    });

    expect(result).toEqual({
      data: sampleData,
      totalElements: 2,
      totalPages: 1,
      rowsPerPage: 2,
      page: 0,
    });

    expect(mockCollection.aggregate).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should handle empty results gracefully", async () => {
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([]),
    });

    const result = await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"], {
      rowsPerPage: 2,
      page: 0,
      order: [],
      search: "",
    });

    expect(result).toEqual({
      data: [],
      totalElements: 0,
      totalPages: 0,
      rowsPerPage: 2,
      page: 0,
    });
  });

  it("should apply search and filters correctly in the pipeline", async () => {
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([
        {
          data: sampleData,
          totalElements: 1,
          totalPages: 1,
          rowsPerPage: 1,
          page: 0,
        },
      ]),
    });

    await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"], {
      rowsPerPage: 1,
      page: 0,
      search: "Bob",
      order: [],
      filters: { age: 25 },
    });

    const pipeline = mockCollection.aggregate.mock.calls[0][0];

    // Match pipeline should include the search condition
    expect(pipeline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          $match: {
            $and: [
              {
                $or: [{ name: { $regex: "Bob", $options: "i" } }],
              },
              { age: 25 },
            ],
          },
        }),
      ]),
    );
  });

  it("should apply sorting correctly in the pipeline", async () => {
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([
        {
          data: sampleData,
          totalElements: 1,
          totalPages: 1,
          rowsPerPage: 1,
          page: 0,
        },
      ]),
    });

    await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"], {
      rowsPerPage: 1,
      page: 0,
      order: ["age desc"],
      search: "",
    });

    const pipeline = mockCollection.aggregate.mock.calls[0][0];

    // Sort pipeline should include the sort condition
    expect(pipeline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          $sort: { age: -1 },
        }),
      ]),
    );
  });

  it("should calculate pagination correctly", async () => {
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([
        {
          data: sampleData,
          totalElements: 50,
          totalPages: 5,
          rowsPerPage: 10,
          page: 4,
        },
      ]),
    });

    const result = await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"], {
      rowsPerPage: 10,
      page: 4,
      order: [],
      search: "",
    });

    expect(result).toEqual({
      data: sampleData,
      totalElements: 50,
      totalPages: 5,
      rowsPerPage: 10,
      page: 4,
    });

    expect(mockCollection.aggregate).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should handle no options provided", async () => {
    mockCollection.aggregate.mockReturnValueOnce({
      toArray: vi.fn().mockResolvedValueOnce([
        {
          data: sampleData,
          totalElements: 50,
          totalPages: 1,
          rowsPerPage: 0,
          page: 0,
        },
      ]),
    });

    const result = await paginate(mockCollection as unknown as mongodb.Collection<TODO>, ["name"]);

    expect(result).toEqual({
      data: sampleData,
      totalElements: 50,
      totalPages: 1,
      rowsPerPage: 0,
      page: 0,
    });
  });
});
