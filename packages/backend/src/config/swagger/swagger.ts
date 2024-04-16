import swaggerJsdoc from "swagger-jsdoc";

const packageRoot = (path: string) => `packages/backend/${path}`;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "0.0.1",
      description: "This is a dynamically generated Swagger API documentation",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [packageRoot("src/controllers/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
