import { Entity } from "../../../config";
import { Injectable } from "../../../decorators/Injectable";
import MongoUser from "../../../domain/MongoUser";
import { User } from "../../../form/UserForm";
import { UserRepository } from "../UserRepository";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async findAll(): Promise<Entity<User>[]> {
    return await MongoUser.find();
  }
  async create(user: User): Promise<Entity<User>> {
    return await new MongoUser(user).save();
  }
}
