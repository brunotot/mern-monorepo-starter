import { contracts } from "@org/lib-api-client";
import { type TODO } from "@org/lib-commons";
import { type RouteInput, type RouteOutput } from "@org/app-node-express/config/Route.config";
import { autowired } from "@org/app-node-express/decorators/autowired";
import { contract } from "@org/app-node-express/decorators/contract";
import { type UserService } from "../service/UserService";

export class UserController {
  @autowired userService: UserService;

  @contract({ contract: contracts.User.findOneByUsername, roles: ["admin"] })
  async findOneByUsername(
    payload: RouteInput<typeof contracts.User.findOneByUsername>,
  ): RouteOutput<typeof contracts.User.findOneByUsername> {
    return {
      status: 200,
      body: (await this.userService.findOneByUsername(payload.query.username)) as TODO,
    };
  }

  @contract({
    contract: contracts.User.findAll,
    roles: ["admin"],
  })
  async findAll(): RouteOutput<typeof contracts.User.findAll> {
    return {
      status: 200,
      body: (await this.userService.findAll()) as TODO,
    };
  }

  @contract({ contract: contracts.User.findAllPaginated })
  async findAllPaginated(
    payload: RouteInput<typeof contracts.User.findAllPaginated>,
  ): RouteOutput<typeof contracts.User.findAllPaginated> {
    return {
      status: 200,
      body: (await this.userService.search(payload.query.paginationOptions)) as TODO,
    };
  }

  @contract({ contract: contracts.User.createOne })
  async createOne(
    payload: RouteInput<typeof contracts.User.createOne>,
  ): RouteOutput<typeof contracts.User.createOne> {
    const user = await this.userService.create(payload.body);
    return {
      status: 201,
      body: user,
    };
  }

  @contract({ contract: contracts.User.deleteByUsername })
  async deleteByUsername(
    payload: RouteInput<typeof contracts.User.deleteByUsername>,
  ): RouteOutput<typeof contracts.User.deleteByUsername> {
    await this.userService.deleteByUsername(payload.body.username);
    return {
      status: 201,
      body: "OK",
    };
  }
}
