import { PaginationOptions, type TODO } from "@org/lib-commons";
import { type PaginationResult } from "@org/lib-commons";
import { type UserRepository } from "@org/app-node-express/infrastructure/repository/impl/UserRepository";
import { autowired } from "@org/app-node-express/decorators/autowired";
import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import { RestError, type User } from "@org/lib-api-client";

export class UserService {
  @autowired private userRepository: UserRepository;
  @autowired private authorizationRepository: AuthorizationRepository;

  async findAll(): Promise<User[]> {
    return await this.authorizationRepository.findAllUsers();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return user;
  }

  // TODO Remove below functions.

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<TODO>> {
    return await this.userRepository.findAllPaginated(PaginationOptions.parse(options));
  }

  async create(user: TODO): Promise<TODO> {
    return await this.userRepository.insertOne(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteByUsername(_username: string): Promise<void> {
    //return await this.userRepository.deleteOneByUsername(username);
    return;
  }
}
