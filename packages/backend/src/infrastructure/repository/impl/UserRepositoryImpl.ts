import { Entity } from "../../../config";
import { Injectable } from "../../../decorators/Injectable";
import { Transactional } from "../../../decorators/Transactional";
import MongoUser from "../../../domain/MongoUser";
import { User } from "../../../form/UserForm";
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
