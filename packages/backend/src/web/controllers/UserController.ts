import { Role, type TODO } from "@org/shared";
import type { MongoSort, RouteInput, RouteOutput } from "@org/backend/types";
import { Autowired, Contract, Injectable } from "@org/backend/decorators";
import {
  withJwt,
  withPaginableParams,
  withUserRoles,
  type UserService,
} from "@org/backend/infrastructure";

@Injectable()
export class UserController {
  @Autowired() userService: UserService;

  @Contract("User.findAll", withJwt(), withUserRoles(Role.enum.ADMIN))
  async findAll(): RouteOutput<"User.findAll"> {
    const users = await this.userService.findAll();
    const pageableResponse = users as TODO;
    return {
      status: 200,
      body: pageableResponse,
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
