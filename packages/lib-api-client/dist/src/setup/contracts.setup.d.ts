export declare const contracts: {
    readonly User: {
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
                200: import("zod").ZodArray<import("zod").ZodObject<{
                    readonly username: import("zod").ZodString;
                    readonly password: import("zod").ZodString;
                    readonly email: import("zod").ZodString;
                    readonly roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                    readonly refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
                } & {
                    readonly _id: import("zod").ZodOptional<import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>>;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }>, "many">;
                401: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, {}>, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
            };
        };
        findOneByUsername: {
            description: "Get a user by id";
            metadata: {
                readonly openApiTags: readonly ["UserController"];
            };
            strictStatusCodes: true;
            query: import("zod").ZodObject<{
                username: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                username: string;
            }, {
                username: string;
            }>;
            summary: "Get a user by id";
            method: "GET";
            path: "/users/findOneByUsername";
            responses: {
                200: import("zod").ZodObject<{
                    readonly username: import("zod").ZodString;
                    readonly password: import("zod").ZodString;
                    readonly email: import("zod").ZodString;
                    readonly roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                    readonly refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
                } & {
                    readonly _id: import("zod").ZodOptional<import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>>;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }>;
                401: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, {}>, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
                404: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, {}>, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
                500: import("zod").ZodObject<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
            };
        };
        findAllPaginated: {
            description: "Get all users";
            metadata: {
                readonly openApiTags: readonly ["UserController"];
            };
            strictStatusCodes: true;
            query: import("zod").ZodObject<{
                paginationOptions: import("zod").ZodEffects<import("zod").ZodString, {
                    search: string;
                    rowsPerPage: number;
                    page: number;
                    order: string[];
                    filters?: any;
                }, string>;
            }, "strip", import("zod").ZodTypeAny, {
                paginationOptions: {
                    search: string;
                    rowsPerPage: number;
                    page: number;
                    order: string[];
                    filters?: any;
                };
            }, {
                paginationOptions: string;
            }>;
            summary: "Get all users";
            method: "GET";
            path: "/users/findAllPaginated";
            responses: {
                200: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    data: import("zod").ZodArray<import("zod").ZodAny, "many">;
                    totalPages: import("zod").ZodNumber;
                    totalElements: import("zod").ZodNumber;
                    rowsPerPage: import("zod").ZodNumber;
                    page: import("zod").ZodNumber;
                }, {
                    data: import("zod").ZodArray<import("zod").ZodObject<{
                        readonly username: import("zod").ZodString;
                        readonly password: import("zod").ZodString;
                        readonly email: import("zod").ZodString;
                        readonly roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                        readonly refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
                    } & {
                        readonly _id: import("zod").ZodOptional<import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>>;
                    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                        username: string;
                        password: string;
                        email: string;
                        roles: ("ADMIN" | "USER")[];
                        refreshToken: string[];
                        _id?: String | undefined;
                    }, {
                        username: string;
                        password: string;
                        email: string;
                        roles: ("ADMIN" | "USER")[];
                        refreshToken: string[];
                        _id?: String | undefined;
                    }>, "many">;
                }>, "strip", import("zod").ZodTypeAny, {
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
                }, {
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
                }>;
                500: import("zod").ZodObject<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
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
            body: import("zod").ZodObject<{
                readonly username: import("zod").ZodString;
                readonly password: import("zod").ZodString;
                readonly email: import("zod").ZodString;
                readonly roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                readonly refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
            } & {
                readonly _id: import("zod").ZodOptional<import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>>;
            }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                username: string;
                password: string;
                email: string;
                roles: ("ADMIN" | "USER")[];
                refreshToken: string[];
                _id?: String | undefined;
            }, {
                username: string;
                password: string;
                email: string;
                roles: ("ADMIN" | "USER")[];
                refreshToken: string[];
                _id?: String | undefined;
            }>;
            path: "/users/createOne";
            responses: {
                201: import("zod").ZodObject<{
                    readonly username: import("zod").ZodString;
                    readonly password: import("zod").ZodString;
                    readonly email: import("zod").ZodString;
                    readonly roles: import("zod").ZodArray<import("zod").ZodEnum<["ADMIN", "USER"]>, "many">;
                    readonly refreshToken: import("zod").ZodArray<import("zod").ZodString, "many">;
                } & {
                    readonly _id: import("zod").ZodOptional<import("zod").ZodSchema<String, import("zod").ZodTypeDef, String>>;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }, {
                    username: string;
                    password: string;
                    email: string;
                    roles: ("ADMIN" | "USER")[];
                    refreshToken: string[];
                    _id?: String | undefined;
                }>;
                500: import("zod").ZodObject<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
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
            body: import("zod").ZodObject<{
                username: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                username: string;
            }, {
                username: string;
            }>;
            path: "/users/deleteByUsername";
            responses: {
                201: import("zod").ZodString;
                500: import("zod").ZodObject<{
                    details: import("zod").ZodString;
                    status: import("zod").ZodNumber;
                    message: import("zod").ZodString;
                    path: import("zod").ZodString;
                    timestamp: import("zod").ZodString;
                    metadata: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, "strip", import("zod").ZodTypeAny, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }, {
                    details: string;
                    status: number;
                    message: string;
                    path: string;
                    timestamp: string;
                    metadata: Record<string, any>;
                }>;
            };
        };
    };
};
//# sourceMappingURL=contracts.setup.d.ts.map