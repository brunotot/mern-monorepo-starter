import type { TODO } from "@org/lib-commons";

import { MongoMemoryReplSet } from "mongodb-memory-server";
import { vi } from "vitest";

import { mongoConnectionUrlFactory, REPLICA_SET_COUNT } from "@/mongoConnectionUrlFactory";

vi.mock("mongodb-memory-server", () => ({
  MongoMemoryReplSet: {
    create: vi.fn(),
  },
}));

describe("mongoConnectionUrlFactory - Server Boot", () => {
  it("should successfully boot the server", async () => {
    const mockServer = {
      getUri: vi.fn().mockReturnValue("mongodb://127.0.0.1:27017"),
    };

    (MongoMemoryReplSet.create as TODO).mockResolvedValue(mockServer);

    const result = await mongoConnectionUrlFactory();

    expect(MongoMemoryReplSet.create).toHaveBeenCalledWith({
      replSet: { count: REPLICA_SET_COUNT },
    });

    expect(result.server).toBe(mockServer);
  });
});
