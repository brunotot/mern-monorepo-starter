import type { UserPageableResponseDto, UserRepository } from "@internal";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { MongoRepository, Repository, Transactional, User } from "@internal";

export const PaginationOptions = z.object({
  page: z.number().optional().default(0),
  limit: z.number().optional().default(10),
  search: z.string().optional().default(""),
  order: z
    .array(z.tuple([z.string(), z.union([z.literal("asc"), z.literal("desc")])]))
    .optional()
    .default([]),
});

export type PaginationOptions = z.infer<typeof PaginationOptions>;

@Repository(User)
export class UserRepositoryImpl extends MongoRepository<User> implements UserRepository {
  async findOne(filters: Partial<User>): Promise<User | null> {
    return await this.collection.findOne(filters);
  }

  // prettier-ignore
  async pagination() {
    // TODO
    const options = PaginationOptions.parse({});
    const { page, limit/*, search, order*/ } = options;
    const skip = page * limit;
    
    const aggregation = this.collection.aggregate([
      { $facet: { data: [{ $skip: skip }, { $limit: limit }] } },
      { $count: "totalElements" },
      {
        $project: {
          _id: 0,
          data: "$data",
          totalElements: "$totalElements",
          //totalPages: { $ceil: { $divide: ["$totalElements", limit] } },
          rowsPerPage: `${limit}`,
          page: `${page}`,
        }
      }
    ]);

    try {
      const otherResult = await this.collection.find().toArray();
      console.log(otherResult);
    } catch (err) {
      console.log(err);
    }

    const arrayResult = await aggregation.toArray();

    return arrayResult[0] as UserPageableResponseDto;
  }

  async findAll(): Promise<User[]> {
    return await this.collection.find().toArray();
  }

  @Transactional()
  async insertOne(user: Omit<User, "_id">): Promise<User> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }

  @Transactional()
  async updateOne(user: User): Promise<User> {
    await this.collection.updateOne({ _id: user._id }, user);
    return user;
  }
}
