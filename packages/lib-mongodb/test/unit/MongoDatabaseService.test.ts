import type { TODO, zod } from "@org/lib-commons";

import { type ClientSession, MongoClient, type Db } from "mongodb";
import { vi, describe, it, beforeEach, expect } from "vitest";

import { MongoDatabaseService } from "@/MongoDatabaseService";

vi.mock("mongodb", () => ({
  MongoClient: vi.fn(),
}));

describe("MongoDatabaseService", () => {
  let service: MongoDatabaseService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = MongoDatabaseService.getInstance();
    service.client = vi.fn() as unknown as MongoClient;
  });

  describe("sneakyThrows", () => {
    it("should return the result of the provided function if no error occurs", async () => {
      const mockFn = vi.fn().mockResolvedValue("success");

      const sneakyThrowsSpy = vi.spyOn(service as TODO, "sneakyThrows");

      const result = await (service as TODO)["sneakyThrows"](mockFn);

      expect(mockFn).toHaveBeenCalled();
      expect(result).toBe("success");
      expect(sneakyThrowsSpy).toHaveBeenCalledWith(mockFn);
    });

    it("should return undefined if the provided function throws an error", async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error("failure"));

      const result = await (service as TODO)["sneakyThrows"](mockFn);

      expect(mockFn).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe("buildMongoClient", () => {
    it("should initialize MongoClient with the provided connectionUrl", () => {
      const mockConnectionUrl = "mongodb://localhost:27017";
      const mockDatabaseName = "testdb";
      const mockEnv = "development";

      const client = MongoDatabaseService.buildMongoClient(
        mockConnectionUrl,
        mockDatabaseName,
        mockEnv,
      );

      expect(client).toBeInstanceOf(MongoClient);
      expect(service.connectionUrl).toBe(mockConnectionUrl);
      expect(service.databaseName).toBe(mockDatabaseName);
      expect(service.testMode).toBe(false);
    });

    it("should set testMode to true if env is 'test'", () => {
      MongoDatabaseService.buildMongoClient("mongodb://localhost:27017", "testdb", "test");
      expect(service.testMode).toBe(true);
    });
  });

  describe("getInstance", () => {
    it("should return a singleton instance", () => {
      const instance1 = MongoDatabaseService.getInstance();
      const instance2 = MongoDatabaseService.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe("rollbackTransaction", () => {
    it("should return early if session is undefined", async () => {
      const result = await service.rollbackTransaction(undefined as unknown as ClientSession);

      expect(result).toBeUndefined();
    });

    it("should call abortTransaction and endSession on session if not in testMode", async () => {
      const mockSession = {
        abortTransaction: vi.fn(),
        endSession: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = false;

      await service.rollbackTransaction(mockSession);

      expect(mockSession.abortTransaction).toHaveBeenCalled();
      expect(mockSession.endSession).toHaveBeenCalled();
    });

    it("should do nothing if in testMode", async () => {
      const mockSession = {
        abortTransaction: vi.fn(),
        endSession: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = true;

      await service.rollbackTransaction(mockSession);

      expect(mockSession.abortTransaction).not.toHaveBeenCalled();
      expect(mockSession.endSession).not.toHaveBeenCalled();
    });
  });

  describe("commitTransaction", () => {
    it("should return early if session is undefined", async () => {
      const result = await service.commitTransaction(undefined as unknown as ClientSession);

      expect(result).toBeUndefined();
    });

    it("should call commitTransaction and endSession on session if not in testMode", async () => {
      const mockSession = {
        commitTransaction: vi.fn(),
        endSession: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = false;

      await service.commitTransaction(mockSession);

      expect(mockSession.commitTransaction).toHaveBeenCalled();
      expect(mockSession.endSession).toHaveBeenCalled();
    });

    it("should do nothing if in testMode", async () => {
      const mockSession = {
        commitTransaction: vi.fn(),
        endSession: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = true;

      await service.commitTransaction(mockSession);

      expect(mockSession.commitTransaction).not.toHaveBeenCalled();
      expect(mockSession.endSession).not.toHaveBeenCalled();
    });
  });

  describe("startTransaction", () => {
    it("should start a transaction if not in testMode", async () => {
      const mockSession = {
        inTransaction: vi.fn().mockReturnValue(false),
        startTransaction: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = false;

      const session = await service.startTransaction(mockSession);

      expect(mockSession.startTransaction).toHaveBeenCalled();
      expect(session).toBe(mockSession);
    });

    it("should do nothing and return null if in testMode", async () => {
      const mockSession = {
        inTransaction: vi.fn(),
        startTransaction: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = true;

      const session = await service.startTransaction(mockSession);

      expect(mockSession.startTransaction).not.toHaveBeenCalled();
      expect(session).toBeNull();
    });

    it("should not start a transaction if session is already in a transaction", async () => {
      const mockSession = {
        inTransaction: vi.fn().mockReturnValue(true),
        startTransaction: vi.fn(),
      } as unknown as ClientSession;

      service.testMode = false;

      const session = await service.startTransaction(mockSession);

      expect(mockSession.startTransaction).not.toHaveBeenCalled();
      expect(session).toBe(mockSession);
    });
  });

  describe("collection", () => {
    it("should return a collection with the correct name", () => {
      const mockDb = {
        collection: vi.fn(),
      } as unknown as Db;

      const mockZodSchema = {
        description: "users",
      } as unknown as zod.Schema;

      service.client.db = vi.fn().mockReturnValue(mockDb);

      service.collection(mockZodSchema);

      expect(mockDb.collection).toHaveBeenCalledWith("users", {});
    });

    it("should throw an error if the schema has no description", () => {
      const mockZodSchema = {} as unknown as zod.Schema;

      expect(() => service.collection(mockZodSchema)).toThrowError("No document name provided.");
    });
  });
});
