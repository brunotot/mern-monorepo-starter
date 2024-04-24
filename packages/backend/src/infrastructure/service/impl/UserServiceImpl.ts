import type { TODO } from "@org/shared";

import type { PaginationResult, User } from "@domain";
import type { PaginationOptions, UserRepository, UserService } from "@infrastructure";
import { Autowired, Injectable } from "@decorators";

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
