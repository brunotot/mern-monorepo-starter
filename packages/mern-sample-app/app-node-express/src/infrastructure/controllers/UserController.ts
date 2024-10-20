import type { UserService } from "@org/app-node-express/infrastructure/service/UserService";
import type { RouteInput, RouteOutput } from "@org/app-node-express/lib/@ts-rest";
import type { TODO } from "@org/lib-commons";

import { contract } from "@org/app-node-express/infrastructure/decorators";
import { withRouteSecured } from "@org/app-node-express/infrastructure/middleware/withRouteSecured";
import { autowired, inject } from "@org/app-node-express/ioc";
import { contracts, Role } from "@org/lib-api-client";

@inject("UserController")
export class UserController {
  @autowired() private userService: UserService;

  @contract(contracts.User.findOneByUsername, withRouteSecured(Role.Enum["avr-admin"]))
  async findOneByUsername(
    payload: RouteInput<typeof contracts.User.findOneByUsername>,
  ): RouteOutput<typeof contracts.User.findOneByUsername> {
    return {
      status: 200,
      body: await this.userService.findOneByUsername(payload.query.username),
    };
  }

  @contract(contracts.User.findAll, withRouteSecured(Role.Enum["avr-admin"]))
  async findAll(): RouteOutput<typeof contracts.User.findAll> {
    return {
      status: 200,
      body: await this.userService.findAll(),
    };
  }

  @contract(contracts.User.findAllPaginated, withRouteSecured(Role.Enum["avr-admin"]))
  async findAllPaginated(
    payload: RouteInput<typeof contracts.User.findAllPaginated>,
  ): RouteOutput<typeof contracts.User.findAllPaginated> {
    const paginationOptions: TODO = payload.query.paginationOptions;
    return {
      status: 200,
      body: await this.userService.findAllPaginated(paginationOptions),
    };
  }

  @contract(contracts.User.createUser, withRouteSecured(Role.Enum["avr-admin"]))
  async createUser(
    payload: RouteInput<typeof contracts.User.createUser>,
  ): RouteOutput<typeof contracts.User.createUser> {
    delete payload.body["id"];
    return {
      status: 200,
      body: await this.userService.createUser(payload.body),
    };
  }

  @contract(contracts.User.deleteUser, withRouteSecured(Role.Enum["avr-admin"]))
  async deleteUser(
    payload: RouteInput<typeof contracts.User.deleteUser>,
  ): RouteOutput<typeof contracts.User.deleteUser> {
    await this.userService.deleteUser(payload.query.id);
    return {
      status: 204,
      body: undefined,
    };
  }
}
