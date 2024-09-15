import { PaginationOptions, type TODO } from "@org/lib-commons";
import { type PaginationResult } from "@org/lib-commons";
import { type UserRepository } from "@org/app-node-express/infrastructure/repository/impl/UserRepository";
import { type User } from "@org/lib-commons";
import { autowired } from "@org/app-node-express/decorators/autowired";
import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import type * as KC from "@org/app-node-express/lib/keycloak-connect";
import { RestError } from "@org/lib-api-client";

export class UserService {
  @autowired private userRepository: UserRepository;
  @autowired private authorizationRepository: AuthorizationRepository;

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<User>> {
    return await this.userRepository.findAllPaginated(PaginationOptions.parse(options));
  }

  async findAll(): Promise<KC.KeycloakUser[]> {
    return await this.authorizationRepository.findAllUsers();
  }

  async findOneByUsername(username: string): Promise<KC.KeycloakUser> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return user;
  }

  async create(user: User): Promise<User> {
    return (await this.userRepository.insertOne(user)) as TODO;
  }

  async deleteByUsername(username: string): Promise<void> {
    return await this.userRepository.deleteOneByUsername(username);
  }
}
