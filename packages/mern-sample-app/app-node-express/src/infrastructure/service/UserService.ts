import type { AuthorizationRepository } from "../repository/UserRepository";
import type {
  ApiKeycloakUser,
  KcUserRepresentation,
  Role,
  TypedPaginationResponse,
  User,
} from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";

import { autowired, inject } from "@org/app-node-express/ioc";
import { RestError, ROLE_LIST } from "@org/lib-api-client";

@inject("UserService")
export class UserService {
  @autowired() private authorizationRepository: AuthorizationRepository;

  async findAll(): Promise<User[]> {
    const users = await this.authorizationRepository.findAllUsers();
    const mappedUsers = await Promise.all(users.map(async user => await this.userMapper(user)));
    return mappedUsers;
  }

  async findAllPaginated(paginationOptions: TODO): Promise<TypedPaginationResponse<User>> {
    // eslint-disable-next-line no-console
    console.log(paginationOptions);
    return null as TODO;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return this.userMapper(user);
  }

  async createUser(model: KcUserRepresentation): Promise<User> {
    const user = await this.authorizationRepository.createUser(model);
    return {
      _id: user.id,
      username: user.username,
      roles: model.realmRoles,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.authorizationRepository.deleteUser(id);
  }

  private async userMapper(model: ApiKeycloakUser): Promise<User> {
    const roles = await this.authorizationRepository.findRolesByUserId(model.id);
    return {
      _id: model.id,
      username: model.username,
      roles: roles.filter(
        (role: string): role is Role => !!ROLE_LIST.find((r: string) => r === role),
      ),
    };
  }
}
