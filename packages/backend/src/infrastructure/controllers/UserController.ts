import { ErrorResponse, type TODO } from "@org/shared";
import type { MongoSort, RouteInput, RouteOutput } from "@org/backend/types";
import { Autowired, Contract, Injectable } from "@org/backend/decorators";
import { withPaginableParams } from "@org/backend/infrastructure/middleware/locals/withPaginableParams";
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

  @Contract("User.pagination", withPaginableParams())
  async pagination({ query }: RouteInput<"User.pagination">): RouteOutput<"User.pagination"> {
    //throw new Error("Testing error");
    const paginationOptions = {
      filters: {},
      sort: (query.sort ? query.sort.split(",").map(value => value.split("|")) : []) as MongoSort,
      page: query.page,
      limit: query.limit,
      search: {
        fields: ["username", "email"],
        regex: query.search,
      },
    };

    const paginatedResult = (await this.userService.search(paginationOptions)) as TODO;

    return {
      status: 200,
      body: paginatedResult,
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
}
