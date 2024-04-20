import { Entity } from "../../../config";
import { Injectable } from "../../../decorators/ioc/@Injectable";
import { Transactional } from "../../../decorators/ioc/@Transactional";
import { User } from "../../../domain";
import { MongoUser } from "../../../domain/User";
import { UserRepository } from "../UserRepository";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async save(user: User): Promise<Entity<User>> {
    return await new MongoUser(user).save();
  }

  async findOne(filters: Parameters<typeof MongoUser.findOne>[0]): Promise<Entity<User> | null> {
    return await MongoUser.findOne(filters).exec();
  }

  async findAll(): Promise<Entity<User>[]> {
    return await MongoUser.find();
  }

  @Transactional()
  async create(user: User): Promise<Entity<User>> {
    return await new MongoUser(user).save();
  }
}
