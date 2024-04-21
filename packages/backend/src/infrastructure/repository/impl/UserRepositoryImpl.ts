import type { Entity, User, UserRepository } from "@internal";
import { Injectable, Transactional, userDomain } from "@internal";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async save(user: User): Promise<Entity<User>> {
    return await new userDomain.db(user).save();
  }

  async findOne(
    filters: Parameters<typeof userDomain.db.findOne>[0],
  ): Promise<Entity<User> | null> {
    return await userDomain.db.findOne(filters).exec();
  }

  async findAll(): Promise<Entity<User>[]> {
    return await userDomain.db.find();
  }

  @Transactional()
  async create(user: User): Promise<Entity<User>> {
    return await new userDomain.db(user).save();
  }
}
