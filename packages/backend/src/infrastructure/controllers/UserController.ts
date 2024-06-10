import { ErrorResponse, type TODO } from "@org/shared";
import type { RouteInput, RouteOutput } from "@org/backend/types";
import { Autowired, Contract, Injectable } from "@org/backend/decorators";
import { type UserService } from "@org/backend/infrastructure/service/UserService";

@Injectable("userController")
export class UserController {
  @Autowired() userService: UserService;

  @Contract("User.findOne")
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

  @Contract("User.pagination")
  async pagination({ query }: RouteInput<"User.pagination">): RouteOutput<"User.pagination"> {
    return {
      status: 200,
      body: (await this.userService.search(query.paginationOptions)) as TODO,
    };
  }

  @Contract("User.create")
  async create({ body }: RouteInput<"User.create">): RouteOutput<"User.create"> {
    const user = await this.userService.create(body);
    return {
      status: 201,
      body: user,
    };
  }

  @Contract("User.deleteByUsername")
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
