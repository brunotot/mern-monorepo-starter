import type { TODO } from "@org/shared";

import type {
  PaginationOptions,
  PaginationResult,
  User,
  UserRepository,
  UserService,
} from "@internal";
import { Autowired, Injectable } from "@internal";

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
