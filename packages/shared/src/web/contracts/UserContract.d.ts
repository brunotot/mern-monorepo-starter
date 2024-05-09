import { z } from "zod";
export declare function PageableResponseDto<T extends z.AnyZodObject>(
  schema: T,
): z.ZodObject<
  z.objectUtil.extendShape<
    {
      data: z.ZodArray<z.ZodAny, "many">;
      totalPages: z.ZodNumber;
      totalElements: z.ZodNumber;
      rowsPerPage: z.ZodNumber;
      page: z.ZodNumber;
    },
    {
      data: z.ZodArray<T, "many">;
    }
  >,
  "strip",
  z.ZodTypeAny,
  {
    data: T["_output"][];
    totalPages: number;
    totalElements: number;
    rowsPerPage: number;
    page: number;
  },
  {
    data: T["_input"][];
    totalPages: number;
    totalElements: number;
    rowsPerPage: number;
    page: number;
  }
>;
export type PaginationResult<T> = {
  data: T[];
  totalPages: number;
  totalElements: number;
  rowsPerPage: number;
  page: number;
};
export declare const UserPageableResponseDto: z.ZodObject<
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
            _id: z.ZodType<String, z.ZodTypeDef, String>;
            username: z.ZodString;
            password: z.ZodString;
            email: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
            refreshToken: z.ZodArray<z.ZodString, "many">;
          },
          "strip",
          z.ZodTypeAny,
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
  z.ZodTypeAny,
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
export declare const UserContract: {
  findOne: {
    description: "Get a user by id";
    metadata: {
      openApiTags: string[];
    };
    strictStatusCodes: true;
    pathParams: z.ZodObject<
      {
        id: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
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
      200: z.ZodObject<
        {
          _id: z.ZodType<String, z.ZodTypeDef, String>;
          username: z.ZodString;
          password: z.ZodString;
          email: z.ZodString;
          roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
          refreshToken: z.ZodArray<z.ZodString, "many">;
        },
        "strip",
        z.ZodTypeAny,
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
    query: z.ZodObject<
      {
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        sort: z.ZodDefault<z.ZodString>;
        search: z.ZodDefault<z.ZodString>;
      },
      "strip",
      z.ZodTypeAny,
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
                  _id: z.ZodType<String, z.ZodTypeDef, String>;
                  username: z.ZodString;
                  password: z.ZodString;
                  email: z.ZodString;
                  roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
                  refreshToken: z.ZodArray<z.ZodString, "many">;
                },
                "strip",
                z.ZodTypeAny,
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
        z.ZodTypeAny,
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
    body: z.ZodObject<
      {
        _id: z.ZodType<String, z.ZodTypeDef, String>;
        username: z.ZodString;
        password: z.ZodString;
        email: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
        refreshToken: z.ZodArray<z.ZodString, "many">;
      },
      "strip",
      z.ZodTypeAny,
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
      201: z.ZodObject<
        {
          _id: z.ZodType<String, z.ZodTypeDef, String>;
          username: z.ZodString;
          password: z.ZodString;
          email: z.ZodString;
          roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
          refreshToken: z.ZodArray<z.ZodString, "many">;
        },
        "strip",
        z.ZodTypeAny,
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
//# sourceMappingURL=UserContract.d.ts.map
