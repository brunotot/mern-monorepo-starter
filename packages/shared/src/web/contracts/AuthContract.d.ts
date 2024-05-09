import { ContractNoBody } from "@ts-rest/core";
import { z } from "zod";
export declare const LoginForm: z.ZodObject<
  {
    username: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    username: string;
    password: string;
  },
  {
    username: string;
    password: string;
  }
>;
export declare const LoginResponse: z.ZodObject<
  {
    accessToken: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    accessToken: string;
  },
  {
    accessToken: string;
  }
>;
export declare const AuthContract: {
  login: {
    description: "Login user";
    metadata: {
      openApiTags: string[];
    };
    strictStatusCodes: true;
    summary: "Login user";
    method: "POST";
    body: z.ZodObject<
      {
        username: z.ZodString;
        password: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
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
          accessToken: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          accessToken: string;
        },
        {
          accessToken: string;
        }
      >;
      400: z.ZodObject<
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
    body: typeof ContractNoBody;
    path: "/auth/logout";
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
      204: typeof ContractNoBody;
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
    body: typeof ContractNoBody;
    path: "/auth/refresh";
    headers: z.ZodObject<
      {
        authentication: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        authentication: string;
      },
      {
        authentication: string;
      }
    >;
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
          accessToken: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          accessToken: string;
        },
        {
          accessToken: string;
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
      403: z.ZodObject<
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
};
//# sourceMappingURL=AuthContract.d.ts.map
