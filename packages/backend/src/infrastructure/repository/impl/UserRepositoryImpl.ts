import { Injectable } from "@org/backend/decorators";
import { User, ObjectId } from "@org/shared";
import { type UserRepository } from "@org/backend/infrastructure/repository/UserRepository";
import { AbstractRepository } from "../AbstractRepository";

@Injectable("userRepository")
export class UserRepositoryImpl extends AbstractRepository<User> implements UserRepository {
  constructor() {
    super(User);
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
