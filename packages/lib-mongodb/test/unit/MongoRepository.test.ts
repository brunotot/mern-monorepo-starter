import type { PaginationOptions, TODO, TypedPaginationResponse, zod } from "@org/lib-commons";
import type { ClientSession } from "mongodb";

import { vi, describe, it, beforeEach, expect } from "vitest";

import { MongoDatabaseService } from "@/MongoDatabaseService";
import { paginate } from "@/MongoPagination";
import { MongoRepository } from "@/MongoRepository";

vi.mock("@/MongoDatabaseService", () => ({
  MongoDatabaseService: {
    getInstance: vi.fn(),
  },
}));

vi.mock("@/MongoPagination", () => ({
  paginate: vi.fn(),
}));

describe("MongoRepository", () => {
  const mockCollection = {
    find: vi.fn(),
    findOne: vi.fn(),
    insertOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
  };

  const mockSession = {} as ClientSession;

  const mockSchema = {
    description: "testCollection",
  } as unknown as zod.Schema<TODO>;

  class ConcreteMongoRepository extends MongoRepository<TODO> {}

  let repository: ConcreteMongoRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the collection returned by MongoDatabaseService
    MongoDatabaseService.getInstance = vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue(mockCollection),
    });

    repository = new ConcreteMongoRepository(mockSchema, ["field1", "field2"], () => mockSession);
  });

  describe("findAll", () => {
    it("should return all documents in the collection", async () => {
      const mockData = [
        { _id: "1", name: "Test1" },
        { _id: "2", name: "Test2" },
      ];
      mockCollection.find.mockReturnValueOnce({
        toArray: vi.fn().mockResolvedValueOnce(mockData),
      });

      const result = await repository.findAll();

      expect(result).toEqual(mockData);
      expect(mockCollection.find).toHaveBeenCalled();
    });

    it("should return an empty array if no documents are found", async () => {
      mockCollection.find.mockReturnValueOnce({
        toArray: vi.fn().mockResolvedValueOnce([]),
      });

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(mockCollection.find).toHaveBeenCalled();
    });
  });

  describe("findAllPaginated", () => {
    it("should paginate documents using the paginate function", async () => {
      const mockPaginationResult = {
        data: [{ _id: "1", name: "Test1" }],
        totalElements: 1,
        totalPages: 1,
        rowsPerPage: 10,
        page: 0,
      } as TypedPaginationResponse<TODO>;

      (paginate as TODO).mockResolvedValueOnce(mockPaginationResult);

      const options: PaginationOptions = {
        rowsPerPage: 10,
        page: 0,
        order: [],
        search: "",
      };
      const result = await repository.findAllPaginated(options);

      expect(result).toEqual(mockPaginationResult);
      expect(paginate).toHaveBeenCalledWith(mockCollection, ["field1", "field2"], options);
    });

    it("should handle undefined options and use default pagination", async () => {
      const mockPaginationResult = {
        data: [],
        totalElements: 0,
        totalPages: 0,
        rowsPerPage: 0,
        page: 0,
      } as TypedPaginationResponse<TODO>;

      (paginate as TODO).mockResolvedValueOnce(mockPaginationResult);

      const result = await repository.findAllPaginated();

      expect(result).toEqual(mockPaginationResult);
      expect(paginate).toHaveBeenCalledWith(mockCollection, ["field1", "field2"], undefined);
    });
  });

  describe("findOne", () => {
    it("should return a single document matching the query", async () => {
      const mockDoc = { _id: "1", name: "Test1" };
      mockCollection.findOne.mockResolvedValueOnce(mockDoc);

      const result = await repository.findOne({ _id: "1" });

      expect(result).toEqual(mockDoc);
      expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: "1" });
    });

    it("should return null if no document matches the query", async () => {
      mockCollection.findOne.mockResolvedValueOnce(null);

      const result = await repository.findOne({ _id: "non-existent-id" });

      expect(result).toBeNull();
      expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: "non-existent-id" });
    });
  });

  describe("insertOne", () => {
    it("should insert a document and return the inserted document with the generated _id", async () => {
      const mockDoc = { name: "Test1" };
      const mockInsertedId = "1";
      mockCollection.insertOne.mockResolvedValueOnce({ insertedId: mockInsertedId });

      const result = await repository.insertOne(mockDoc);

      expect(result).toEqual({ ...mockDoc, _id: mockInsertedId });
      expect(mockCollection.insertOne).toHaveBeenCalledWith(mockDoc, { session: mockSession });
    });
  });

  describe("updateOne", () => {
    it("should update a document and return the updated document", async () => {
      const mockDoc = { _id: "1", name: "UpdatedTest" };
      mockCollection.updateOne.mockResolvedValueOnce({});

      const result = await repository.updateOne(mockDoc);

      expect(result).toEqual(mockDoc);
      expect(mockCollection.updateOne).toHaveBeenCalledWith({ _id: "1" }, mockDoc, {
        session: mockSession,
      });
    });
  });

  describe("deleteOne", () => {
    it("should delete a document matching the query", async () => {
      mockCollection.deleteOne.mockResolvedValueOnce({});

      await repository.deleteOne({ _id: "1" });

      expect(mockCollection.deleteOne).toHaveBeenCalledWith({ _id: "1" }, { session: mockSession });
    });

    it("should handle cases where no document is found to delete", async () => {
      mockCollection.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });

      await repository.deleteOne({ _id: "non-existent-id" });

      expect(mockCollection.deleteOne).toHaveBeenCalledWith(
        { _id: "non-existent-id" },
        { session: mockSession },
      );
    });
  });

  describe("session handling", () => {
    it("should retrieve a session using the getSession method", () => {
      const result = repository["session"];

      expect(result).toBe(mockSession);
    });

    it("should return undefined if no session is provided", () => {
      const repositoryWithoutSession = new ConcreteMongoRepository(mockSchema, [
        "field1",
        "field2",
      ]);
      const result = repositoryWithoutSession["session"];

      expect(result).toBeUndefined();
    });
  });
});
