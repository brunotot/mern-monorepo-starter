import type { AuthorizationRepository } from "../repository/UserRepository";
import type { TypedPaginationResponse, UserDto, UserForm } from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";

import { autowired, inject } from "@org/app-node-express/lib/ioc";
import { RestError } from "@org/lib-api-client";

@inject("UserService")
export class UserService {
  @autowired() private authorizationRepository: AuthorizationRepository;

  async findAll(): Promise<UserDto[]> {
    const users = await this.authorizationRepository.findAllUsers();
    return users;
  }

  async findAllPaginated(paginationOptions: TODO): Promise<TypedPaginationResponse<UserDto>> {
    // eslint-disable-next-line no-console
    console.log(paginationOptions);
    return null as TODO;
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return user;
  }

  async createUser(model: UserForm): Promise<UserDto> {
    const user = await this.authorizationRepository.createUser(model);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.authorizationRepository.deleteUser(id);
  }
}
