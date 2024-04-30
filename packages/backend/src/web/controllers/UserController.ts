import { type TODO } from "@org/shared";
import type { Request, Response } from "express";
import {
  Autowired,
  Controller,
  Use,
  PostMapping,
  GetMapping,
  Contract,
  type Input,
  type Output,
} from "@decorators";
import { withPaginableParams, type UserService } from "@infrastructure";
import { UserDocs } from "@web/swagger/UserDocs";

@Controller("/users", { description: "User management" })
export class UserController {
  @Autowired() userService: UserService;

  //@Use(withJwt(), withUserRoles(Role.enum.ADMIN))
  @Contract("User.findAll")
  async findAll(data: Input<"User.findAll">): Output<"User.findAll"> {
    console.log(data);
    const users = await this.userService.findAll();
    const pageableResponse = users as TODO;
    return {
      status: 200,
      body: pageableResponse,
    };
  }

  @Use(withPaginableParams())
  @GetMapping("/pagination", UserDocs.pagination)
  async pagination(_req: Request, res: Response) {
    const paginationOptions = res.locals.paginationOptions;
    const paginatedResult = await this.userService.search(paginationOptions);
    res.json(paginatedResult);
  }

  @PostMapping("", UserDocs.create)
  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }
}
