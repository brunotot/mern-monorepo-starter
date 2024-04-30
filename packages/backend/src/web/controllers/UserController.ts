import { Role, type TODO } from "@org/shared";
import { Autowired, Contract, Injectable } from "@decorators";
import { withJwt, withPaginableParams, withUserRoles, type UserService } from "@infrastructure";
import { type MongoSort, type Input, type Output } from "@models";

@Injectable()
export class UserController {
  @Autowired() userService: UserService;

  @Contract("User.findAll", withJwt(), withUserRoles(Role.enum.ADMIN))
  async findAll(data: Input<"User.findAll">): Output<"User.findAll"> {
    data;
    const users = await this.userService.findAll();
    const pageableResponse = users as TODO;
    return {
      status: 200,
      body: pageableResponse,
    };
  }

  @Contract("User.pagination", withPaginableParams())
  async pagination({ query }: Input<"User.pagination">): Output<"User.pagination"> {
    // THIS!!!
    const paginatedResult = (await this.userService.search({
      filters: {},
      sort: (query.sort ? query.sort.split(",").map(value => value.split("|")) : []) as MongoSort,
      page: query.page,
      limit: query.limit,
      search: {
        fields: ["username", "email"],
        regex: query.search,
      },
    })) as TODO;

    return {
      status: 200,
      body: paginatedResult,
    };
  }

  @Contract("User.create")
  async create(data: Input<"User.create">): Output<"User.create"> {
    const body = data.body as TODO;
    const user = (await this.userService.create(body)) as TODO;
    return {
      status: 201,
      body: user,
    };
  }
}
