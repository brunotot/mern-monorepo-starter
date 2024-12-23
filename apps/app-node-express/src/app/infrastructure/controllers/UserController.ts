import type { UserService } from "@/app/infrastructure/service/UserService";
import type { RouteInput, RouteOutput } from "@/lib/@ts-rest";
import type { TODO } from "@org/lib-commons";
import { contracts, Role } from "@org/lib-api-client";
import { contract } from "@/app/infrastructure/decorators";
import { withRouteSecured } from "@/app/infrastructure/middleware/withRouteSecured";
import { withValidatedBody } from "@/app/infrastructure/middleware/withValidatedBody";
import { VALIDATORS } from "@/app/infrastructure/validators";
import { autowired, inject } from "@/lib/ioc";

@inject("UserController")
export class UserController {
  @autowired() private userService: UserService;

  @contract(contracts.User.findAll, withRouteSecured(Role.Enum["avr-admin"]))
  async findAll(): RouteOutput<typeof contracts.User.findAll> {
    /*return {
      status: 500,
      body: {
        message: "Not implemented",
        status: 500,
        timestamp: new Date().toISOString(),
      },
    };*/
    return {
      status: 200,
      body: await this.userService.findAll(),
    };
  }

  @contract(contracts.User.findOneByUsername, withRouteSecured(Role.Enum["avr-admin"]))
  async findOneByUsername(
    payload: RouteInput<typeof contracts.User.findOneByUsername>,
  ): RouteOutput<typeof contracts.User.findOneByUsername> {
    return {
      status: 200,
      body: await this.userService.findOneByUsername(payload.query.username),
    };
  }

  @contract(contracts.User.getFormByUsername, withRouteSecured(Role.Enum["avr-admin"]))
  async getFormByUsername(
    payload: RouteInput<typeof contracts.User.getFormByUsername>,
  ): RouteOutput<typeof contracts.User.getFormByUsername> {
    return {
      status: 200,
      body: await this.userService.getFormByUsername(payload.query.username),
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

  @contract(
    contracts.User.createUser,
    withRouteSecured(Role.Enum["avr-admin"]),
    // TODO
    withValidatedBody(/*UserForm, */ VALIDATORS.User, { groups: ["create"] }),
  )
  async createUser(
    payload: RouteInput<typeof contracts.User.createUser>,
  ): RouteOutput<typeof contracts.User.createUser> {
    delete payload.body["id"];
    return {
      status: 200,
      body: await this.userService.createUser(payload.body),
    };
  }

  @contract(
    contracts.User.updateUser,
    withRouteSecured(Role.Enum["avr-admin"]),
    withValidatedBody(VALIDATORS.User, { groups: ["update"] }),
  )
  async updateUser(
    payload: RouteInput<typeof contracts.User.updateUser>,
  ): RouteOutput<typeof contracts.User.updateUser> {
    return {
      status: 200,
      body: await this.userService.updateUser(payload.body),
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
