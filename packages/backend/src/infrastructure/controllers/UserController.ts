import { ErrorResponse, type TODO } from "@org/shared";
import { contract, type RouteInput, type RouteOutput } from "@org/backend/decorators/contract";
import { autowired } from "@org/backend/decorators/autowired";
import { type UserService } from "../service/UserService";
import { withSecured } from "../middleware/withSecured";

export class UserController {
  @autowired userService: UserService;

  @contract("User.findOne")
  async findOne({ req, params: { id } }: RouteInput<"User.findOne">): RouteOutput<"User.findOne"> {
    const filters = {
      username: id,
    };
    const users = (await this.userService.search({ filters })).data as TODO;

    if (users.length === 0) {
      return {
        status: 404,
        body: new ErrorResponse(req.originalUrl, 404, "User not found").content,
      };
    }

    return {
      status: 200,
      body: users[0],
    };
  }

  @contract("User.findAll", withSecured("admin"))
  async findAll(): RouteOutput<"User.findAll"> {
    return {
      status: 200,
      body: (await this.userService.findAll()) as TODO,
    };
  }

  @contract("User.pagination")
  async pagination({ query }: RouteInput<"User.pagination">): RouteOutput<"User.pagination"> {
    return {
      status: 200,
      body: (await this.userService.search(query.paginationOptions)) as TODO,
    };
  }

  @contract("User.create")
  async create({ body }: RouteInput<"User.create">): RouteOutput<"User.create"> {
    const user = await this.userService.create(body);
    return {
      status: 201,
      body: user,
    };
  }

  @contract("User.deleteByUsername")
  async deleteByUsername({
    body,
  }: RouteInput<"User.deleteByUsername">): RouteOutput<"User.deleteByUsername"> {
    await this.userService.deleteByUsername(body.username);
    return {
      status: 201,
      body: "OK",
    };
  }
}
