import { PaginationOptions, type TODO } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import { Autowired, Injectable } from "@org/backend/decorators";
import { type UserRepository } from "@org/backend/infrastructure/repository/UserRepository";
import { type UserService } from "@org/backend/infrastructure/service/UserService";
import { type User } from "@org/shared";

@Injectable("userService")
export class UserServiceImpl implements UserService {
  @Autowired() userRepository: UserRepository;

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<User>> {
    return this.userRepository.search(PaginationOptions.parse(options));
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll() as TODO;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.insertOne(user) as TODO;
  }

  async deleteByUsername(username: string): Promise<void> {
    return this.userRepository.deleteByUsername(username);
  }
}
