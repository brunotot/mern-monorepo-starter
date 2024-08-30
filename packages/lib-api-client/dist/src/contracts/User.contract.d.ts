import { z } from "@org/lib-commons";
export declare const userContract: {
  findAll: {
    description: "Get all users";
    metadata: {
      readonly openApiTags: readonly ["UserController"];
    };
    strictStatusCodes: true;
    summary: "Get all users";
    method: "GET";
    path: "/users/findAll";
    responses: {
      200: z.ZodArray<
        z.ZodObject<
          {
            readonly username: z.ZodString;
            readonly password: z.ZodString;
            readonly email: z.ZodString;
            readonly roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
            readonly refreshToken: z.ZodArray<z.ZodString, "many">;
          } & {
            readonly _id: z.ZodOptional<z.ZodType<String, z.ZodTypeDef, String>>;
          },
          z.UnknownKeysParam,
          z.ZodTypeAny,
          {
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
            _id?: String | undefined;
          },
          {
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
            _id?: String | undefined;
          }
        >,
        "many"
      >;
      401: z.ZodObject<
        z.objectUtil.extendShape<
          {
            details: z.ZodString;
            status: z.ZodNumber;
            message: z.ZodString;
            path: z.ZodString;
            timestamp: z.ZodString;
            metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
          },
          {}
        >,
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
    };
  };
  findOneByUsername: {
    description: "Get a user by id";
    metadata: {
      readonly openApiTags: readonly ["UserController"];
    };
    strictStatusCodes: true;
    query: z.ZodObject<
      {
        username: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        username: string;
      },
      {
        username: string;
      }
    >;
    summary: "Get a user by id";
    method: "GET";
    path: "/users/findOneByUsername";
    responses: {
      200: z.ZodObject<
        {
          readonly username: z.ZodString;
          readonly password: z.ZodString;
          readonly email: z.ZodString;
          readonly roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
          readonly refreshToken: z.ZodArray<z.ZodString, "many">;
        } & {
          readonly _id: z.ZodOptional<z.ZodType<String, z.ZodTypeDef, String>>;
        },
        z.UnknownKeysParam,
        z.ZodTypeAny,
        {
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
          _id?: String | undefined;
        },
        {
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
          _id?: String | undefined;
        }
      >;
      401: z.ZodObject<
        z.objectUtil.extendShape<
          {
            details: z.ZodString;
            status: z.ZodNumber;
            message: z.ZodString;
            path: z.ZodString;
            timestamp: z.ZodString;
            metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
          },
          {}
        >,
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
      404: z.ZodObject<
        z.objectUtil.extendShape<
          {
            details: z.ZodString;
            status: z.ZodNumber;
            message: z.ZodString;
            path: z.ZodString;
            timestamp: z.ZodString;
            metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
          },
          {}
        >,
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
      500: z.ZodObject<
        {
          details: z.ZodString;
          status: z.ZodNumber;
          message: z.ZodString;
          path: z.ZodString;
          timestamp: z.ZodString;
          metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
        },
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
    };
  };
  findAllPaginated: {
    description: "Get all users";
    metadata: {
      readonly openApiTags: readonly ["UserController"];
    };
    strictStatusCodes: true;
    query: z.ZodObject<
      {
        paginationOptions: z.ZodEffects<
          z.ZodString,
          {
            search: string;
            rowsPerPage: number;
            page: number;
            order: string[];
            filters?: any;
          },
          string
        >;
      },
      "strip",
      z.ZodTypeAny,
      {
        paginationOptions: {
          search: string;
          rowsPerPage: number;
          page: number;
          order: string[];
          filters?: any;
        };
      },
      {
        paginationOptions: string;
      }
    >;
    summary: "Get all users";
    method: "GET";
    path: "/users/findAllPaginated";
    responses: {
      200: z.ZodObject<
        z.objectUtil.extendShape<
          {
            data: z.ZodArray<z.ZodAny, "many">;
            totalPages: z.ZodNumber;
            totalElements: z.ZodNumber;
            rowsPerPage: z.ZodNumber;
            page: z.ZodNumber;
          },
          {
            data: z.ZodArray<
              z.ZodObject<
                {
                  readonly username: z.ZodString;
                  readonly password: z.ZodString;
                  readonly email: z.ZodString;
                  readonly roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
                  readonly refreshToken: z.ZodArray<z.ZodString, "many">;
                } & {
                  readonly _id: z.ZodOptional<z.ZodType<String, z.ZodTypeDef, String>>;
                },
                z.UnknownKeysParam,
                z.ZodTypeAny,
                {
                  username: string;
                  password: string;
                  email: string;
                  roles: ("ADMIN" | "USER")[];
                  refreshToken: string[];
                  _id?: String | undefined;
                },
                {
                  username: string;
                  password: string;
                  email: string;
                  roles: ("ADMIN" | "USER")[];
                  refreshToken: string[];
                  _id?: String | undefined;
                }
              >,
              "many"
            >;
          }
        >,
        "strip",
        z.ZodTypeAny,
        {
          data: {
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
            _id?: String | undefined;
          }[];
          totalPages: number;
          totalElements: number;
          rowsPerPage: number;
          page: number;
        },
        {
          data: {
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
            _id?: String | undefined;
          }[];
          totalPages: number;
          totalElements: number;
          rowsPerPage: number;
          page: number;
        }
      >;
      500: z.ZodObject<
        {
          details: z.ZodString;
          status: z.ZodNumber;
          message: z.ZodString;
          path: z.ZodString;
          timestamp: z.ZodString;
          metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
        },
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
    };
  };
  createOne: {
    description: "Create a user";
    metadata: {
      readonly openApiTags: readonly ["UserController"];
    };
    strictStatusCodes: true;
    summary: "Create a user";
    method: "POST";
    body: z.ZodObject<
      {
        readonly username: z.ZodString;
        readonly password: z.ZodString;
        readonly email: z.ZodString;
        readonly roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
        readonly refreshToken: z.ZodArray<z.ZodString, "many">;
      } & {
        readonly _id: z.ZodOptional<z.ZodType<String, z.ZodTypeDef, String>>;
      },
      z.UnknownKeysParam,
      z.ZodTypeAny,
      {
        username: string;
        password: string;
        email: string;
        roles: ("ADMIN" | "USER")[];
        refreshToken: string[];
        _id?: String | undefined;
      },
      {
        username: string;
        password: string;
        email: string;
        roles: ("ADMIN" | "USER")[];
        refreshToken: string[];
        _id?: String | undefined;
      }
    >;
    path: "/users/createOne";
    responses: {
      201: z.ZodObject<
        {
          readonly username: z.ZodString;
          readonly password: z.ZodString;
          readonly email: z.ZodString;
          readonly roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
          readonly refreshToken: z.ZodArray<z.ZodString, "many">;
        } & {
          readonly _id: z.ZodOptional<z.ZodType<String, z.ZodTypeDef, String>>;
        },
        z.UnknownKeysParam,
        z.ZodTypeAny,
        {
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
          _id?: String | undefined;
        },
        {
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
          _id?: String | undefined;
        }
      >;
      500: z.ZodObject<
        {
          details: z.ZodString;
          status: z.ZodNumber;
          message: z.ZodString;
          path: z.ZodString;
          timestamp: z.ZodString;
          metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
        },
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
    };
  };
  deleteByUsername: {
    description: "Delete User by username";
    metadata: {
      readonly openApiTags: readonly ["UserController"];
    };
    strictStatusCodes: true;
    summary: "Delete User by username";
    method: "DELETE";
    body: z.ZodObject<
      {
        username: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        username: string;
      },
      {
        username: string;
      }
    >;
    path: "/users/deleteByUsername";
    responses: {
      201: z.ZodString;
      500: z.ZodObject<
        {
          details: z.ZodString;
          status: z.ZodNumber;
          message: z.ZodString;
          path: z.ZodString;
          timestamp: z.ZodString;
          metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
        },
        "strip",
        z.ZodTypeAny,
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        },
        {
          details: string;
          status: number;
          message: string;
          path: string;
          timestamp: string;
          metadata: Record<string, any>;
        }
      >;
    };
  };
};
//# sourceMappingURL=User.contract.d.ts.map
