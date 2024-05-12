import { Autowired, Injectable } from "@org/backend/decorators";
import { User, ObjectId, type PaginationResult } from "@org/shared";
import * as PaginationUtils from "@org/backend/infrastructure/utils/PaginationUtils";
import { type UserRepository } from "@org/backend/infrastructure/repository/UserRepository";
import { type Database } from "@org/backend/infrastructure/components/Database";
import { type MongoPaginationOptions } from "@org/backend/types";

@Injectable("userRepository")
export class UserRepositoryImpl implements UserRepository {
  @Autowired() private database: Database;

  private get collection() {
    return this.database.collection(User);
  }

  search(options?: MongoPaginationOptions): Promise<PaginationResult<User>> {
    return PaginationUtils.paginate(this.collection, options);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.collection.findOne({ username });
  }

  async findOneByRefreshTokens(refreshTokens: string[]): Promise<User | null> {
    return await this.collection.findOne({ refreshToken: refreshTokens });
  }

  async findAll(): Promise<User[]> {
    return await this.collection.find().toArray();
  }

  //@Transactional()
  async insertOne(user: Omit<User, "_id">): Promise<User> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }

  //@Transactional()
  async updateOne(user: User): Promise<User> {
    await this.collection.updateOne({ _id: user._id }, user);
    return user;
  }
}
