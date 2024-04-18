import { Entity } from "../../../config";
import { Injectable } from "../../../decorators/@Injectable";
import { Transactional } from "../../../decorators/@Transactional";
import { User } from "../../../domain";
import MongoUser from "../../../domain/UserDomain";
import { UserRepository } from "../UserRepository";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async findAll(): Promise<Entity<User>[]> {
    return await MongoUser.find();
  }

  @Transactional()
  async create(user: User): Promise<Entity<User>> {
    return await new MongoUser(user).save();
  }
}
