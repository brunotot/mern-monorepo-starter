import type { TODO } from "@org/shared";

import type { PaginationResult, User } from "@models";
import { Autowired, Injectable } from "@decorators";
import { type PaginationOptions } from "@models";
import { type UserRepository } from "@infrastructure/repository/interface/UserRepository";
import { type UserService } from "@infrastructure/service/UserService";

@Injectable()
export class UserServiceImpl implements UserService {
  @Autowired() userRepository: UserRepository;

  async search(options?: PaginationOptions): Promise<PaginationResult<User>> {
    return this.userRepository.search(options);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll() as TODO;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.insertOne(user) as TODO;
  }
}
