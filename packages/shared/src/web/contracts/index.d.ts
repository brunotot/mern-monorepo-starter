import type {
  ContractControllerFactory,
  ContractNameFactory,
  ContractResolverFactory,
} from "./../../types";
type ContractController = ContractControllerFactory<typeof CONTRACTS>;
type ContractName = ContractNameFactory<typeof CONTRACTS>;
type ContractResolver<Name extends ContractName> = ContractResolverFactory<typeof CONTRACTS, Name>;
declare const CONTRACTS: {
  readonly Auth: {
    login: {
      description: "Login user";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      summary: "Login user";
      method: "POST";
      body: import("zod").ZodObject<
        {
          username: import("zod").ZodString;
          password: import("zod").ZodString;
        },
        "strip",
        import("zod").ZodTypeAny,
        {
          username: string;
          password: string;
        },
        {
          username: string;
          password: string;
        }
      >;
      path: "/auth/login";
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        200: import("zod").ZodObject<
          {
            accessToken: import("zod").ZodString;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            accessToken: string;
          },
          {
            accessToken: string;
          }
        >;
        400: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              details: import("zod").ZodString;
              status: import("zod").ZodNumber;
              message: import("zod").ZodString;
              path: import("zod").ZodString;
              timestamp: import("zod").ZodString;
              metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            },
            {}
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        401: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              details: import("zod").ZodString;
              status: import("zod").ZodNumber;
              message: import("zod").ZodString;
              path: import("zod").ZodString;
              timestamp: import("zod").ZodString;
              metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            },
            {}
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
      };
    };
    logout: {
      description: "Logout user";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      summary: "Logout user";
      method: "POST";
      body: typeof import("@ts-rest/core").ContractNoBody;
      path: "/auth/logout";
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        204: typeof import("@ts-rest/core").ContractNoBody;
      };
    };
    refresh: {
      description: "Refresh access token";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      summary: "Refresh access token";
      method: "POST";
      body: typeof import("@ts-rest/core").ContractNoBody;
      path: "/auth/refresh";
      headers: import("zod").ZodObject<
        {
          authentication: import("zod").ZodString;
        },
        "strip",
        import("zod").ZodTypeAny,
        {
          authentication: string;
        },
        {
          authentication: string;
        }
      >;
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        200: import("zod").ZodObject<
          {
            accessToken: import("zod").ZodString;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            accessToken: string;
          },
          {
            accessToken: string;
          }
        >;
        401: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              details: import("zod").ZodString;
              status: import("zod").ZodNumber;
              message: import("zod").ZodString;
              path: import("zod").ZodString;
              timestamp: import("zod").ZodString;
              metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            },
            {}
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        403: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              details: import("zod").ZodString;
              status: import("zod").ZodNumber;
              message: import("zod").ZodString;
              path: import("zod").ZodString;
              timestamp: import("zod").ZodString;
              metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            },
            {}
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
      };
    };
  };
  readonly User: {
    findOne: {
      description: "Get a user by id";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      pathParams: import("zod").ZodObject<
        {
          id: import("zod").ZodString;
        },
        "strip",
        import("zod").ZodTypeAny,
        {
          id: string;
        },
        {
          id: string;
        }
      >;
      summary: "Get a user by id";
      method: "GET";
      path: "/users/:id";
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        200: import("zod").ZodObject<
          {
            _id: import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>;
            username: import("zod").ZodString;
            password: import("zod").ZodString;
            email: import("zod").ZodString;
            roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
            refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            _id: String;
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
          },
          {
            _id: String;
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
          }
        >;
        404: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              details: import("zod").ZodString;
              status: import("zod").ZodNumber;
              message: import("zod").ZodString;
              path: import("zod").ZodString;
              timestamp: import("zod").ZodString;
              metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            },
            {}
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
      };
    };
    pagination: {
      description: "Get all users";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      query: import("zod").ZodObject<
        {
          page: import("zod").ZodDefault<import("zod").ZodNumber>;
          limit: import("zod").ZodDefault<import("zod").ZodNumber>;
          sort: import("zod").ZodDefault<import("zod").ZodString>;
          search: import("zod").ZodDefault<import("zod").ZodString>;
        },
        "strip",
        import("zod").ZodTypeAny,
        {
          sort: string;
          search: string;
          page: number;
          limit: number;
        },
        {
          sort?: string | undefined;
          search?: string | undefined;
          page?: number | undefined;
          limit?: number | undefined;
        }
      >;
      summary: "Get all users";
      method: "GET";
      path: `/users${string}`;
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        200: import("zod").ZodObject<
          import("zod").objectUtil.extendShape<
            {
              data: import("zod").ZodArray<import("zod").ZodAny, "many">;
              totalPages: import("zod").ZodNumber;
              totalElements: import("zod").ZodNumber;
              rowsPerPage: import("zod").ZodNumber;
              page: import("zod").ZodNumber;
            },
            {
              data: import("zod").ZodArray<
                import("zod").ZodObject<
                  {
                    _id: import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>;
                    username: import("zod").ZodString;
                    password: import("zod").ZodString;
                    email: import("zod").ZodString;
                    roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                    refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
                  },
                  "strip",
                  import("zod").ZodTypeAny,
                  {
                    _id: String;
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                  },
                  {
                    _id: String;
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                  }
                >,
                "many"
              >;
            }
          >,
          "strip",
          import("zod").ZodTypeAny,
          {
            data: {
              _id: String;
              username: string;
              password: string;
              email: string;
              roles: ("ADMIN" | "USER")[];
              refreshToken: string[];
            }[];
            totalPages: number;
            totalElements: number;
            rowsPerPage: number;
            page: number;
          },
          {
            data: {
              _id: String;
              username: string;
              password: string;
              email: string;
              roles: ("ADMIN" | "USER")[];
              refreshToken: string[];
            }[];
            totalPages: number;
            totalElements: number;
            rowsPerPage: number;
            page: number;
          }
        >;
      };
    };
    create: {
      description: "Create a user";
      metadata: {
        openApiTags: string[];
      };
      strictStatusCodes: true;
      summary: "Create a user";
      method: "POST";
      body: import("zod").ZodObject<
        {
          _id: import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>;
          username: import("zod").ZodString;
          password: import("zod").ZodString;
          email: import("zod").ZodString;
          roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
          refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
        },
        "strip",
        import("zod").ZodTypeAny,
        {
          _id: String;
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
        },
        {
          _id: String;
          username: string;
          password: string;
          email: string;
          roles: ("ADMIN" | "USER")[];
          refreshToken: string[];
        }
      >;
      path: `/users${string}`;
      responses: {
        500: import("zod").ZodObject<
          {
            details: import("zod").ZodString;
            status: import("zod").ZodNumber;
            message: import("zod").ZodString;
            path: import("zod").ZodString;
            timestamp: import("zod").ZodString;
            metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          },
          {
            path: string;
            message: string;
            status: number;
            details: string;
            timestamp: string;
            metadata: Record<string, any>;
          }
        >;
        201: import("zod").ZodObject<
          {
            _id: import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>;
            username: import("zod").ZodString;
            password: import("zod").ZodString;
            email: import("zod").ZodString;
            roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
            refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
          },
          "strip",
          import("zod").ZodTypeAny,
          {
            _id: String;
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
          },
          {
            _id: String;
            username: string;
            password: string;
            email: string;
            roles: ("ADMIN" | "USER")[];
            refreshToken: string[];
          }
        >;
      };
    };
  };
};
export * from "./AuthContract";
export * from "./UserContract";
export type { ContractController, ContractName, ContractResolver };
export { CONTRACTS };
//# sourceMappingURL=index.d.ts.map
