import type { PaginationOptions, TypedPaginationResponse, zod } from "@org/lib-commons";
import type * as mongodb from "mongodb";

import { MongoDatabaseService } from "./MongoDatabaseService";
import { paginate } from "./MongoPagination";

export abstract class MongoRepository<T extends mongodb.Document> {
  private readonly schema: zod.Schema<T>;
  private readonly searchFields: string[];
  private readonly getSession: () => mongodb.ClientSession | undefined;

  private get session(): mongodb.ClientSession | undefined {
    //return IocRegistry.getInstance()
    //  .inject<RouteContextMiddleware>("withRouteContext")
    //  .getSession();
    return this.getSession();
  }

  private get collection() {
    return MongoDatabaseService.getInstance().collection(this.schema);
  }

  constructor(
    schema: zod.Schema<T>,
    searchFields: string[] = [],
    getSession: () => mongodb.ClientSession | undefined = () => undefined,
  ) {
    this.schema = schema;
    this.searchFields = searchFields;
    this.getSession = getSession;
  }

  public async findAll(): Promise<mongodb.WithId<T>[]> {
    return await this.collection.find().toArray();
  }

  public async findAllPaginated(options?: PaginationOptions): Promise<TypedPaginationResponse<T>> {
    return await paginate(this.collection, this.searchFields, options);
  }

  public async findOne(doc: Parameters<mongodb.Collection<T>["findOne"]>[0]) {
    return await this.collection.findOne(doc);
  }

  public async insertOne(doc: mongodb.OptionalUnlessRequiredId<T>): Promise<T> {
    const candidate = { ...doc };
    const { insertedId } = await this.collection.insertOne(candidate, {
      session: this.session,
    });
    return { ...candidate, _id: insertedId } as T;
  }

  public async updateOne(doc: T): Promise<T> {
    await this.collection.updateOne({ _id: doc._id }, doc, {
      session: this.session,
    });
    return doc;
  }

  public async deleteOne(doc: Parameters<mongodb.Collection<T>["deleteOne"]>[0]): Promise<void> {
    await this.collection.deleteOne(doc, { session: this.session });
  }
}
