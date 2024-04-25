import { ObjectId } from "mongodb";
import { Repository } from "@decorators";
import { User } from "@models";

import { MongoRepository } from "@infrastructure/repository/MongoRepository";
import { type UserRepository } from "@infrastructure/repository/interface/UserRepository";

@Repository(User)
export class UserRepositoryImpl extends MongoRepository<User> implements UserRepository {
  async findOne(filters: Partial<User>): Promise<User | null> {
    return await this.collection.findOne(filters);
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
