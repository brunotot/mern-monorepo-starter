import { CONTRACTS, type TODO } from "@org/shared";
import { contract, type RouteInput, type RouteOutput } from "@org/backend/decorators/contract";
import { autowired } from "@org/backend/decorators/autowired";
import { type UserService } from "../service/UserService";

export class UserController {
  @autowired userService: UserService;

  @contract({ contract: CONTRACTS.User.findOneByUsername, roles: ["admin"] })
  async findOneByUsername(
    payload: RouteInput<typeof CONTRACTS.User.findOneByUsername>,
  ): RouteOutput<typeof CONTRACTS.User.findOneByUsername> {
    return {
      status: 200,
      body: (await this.userService.findOneByUsername(payload.query.username)) as TODO,
    };
  }

  @contract({
    contract: CONTRACTS.User.findAll,
    roles: ["admin"],
  })
  async findAll(): RouteOutput<typeof CONTRACTS.User.findAll> {
    return {
      status: 200,
      body: (await this.userService.findAll()) as TODO,
    };
  }

  @contract({ contract: CONTRACTS.User.findAllPaginated })
  async findAllPaginated(
    payload: RouteInput<typeof CONTRACTS.User.findAllPaginated>,
  ): RouteOutput<typeof CONTRACTS.User.findAllPaginated> {
    return {
      status: 200,
      body: (await this.userService.search(payload.query.paginationOptions)) as TODO,
    };
  }

  @contract({ contract: CONTRACTS.User.createOne })
  async createOne(
    payload: RouteInput<typeof CONTRACTS.User.createOne>,
  ): RouteOutput<typeof CONTRACTS.User.createOne> {
    const user = await this.userService.create(payload.body);
    return {
      status: 201,
      body: user,
    };
  }

  @contract({ contract: CONTRACTS.User.deleteByUsername })
  async deleteByUsername(
    payload: RouteInput<typeof CONTRACTS.User.deleteByUsername>,
  ): RouteOutput<typeof CONTRACTS.User.deleteByUsername> {
    await this.userService.deleteByUsername(payload.body.username);
    return {
      status: 201,
      body: "OK",
    };
  }
}
