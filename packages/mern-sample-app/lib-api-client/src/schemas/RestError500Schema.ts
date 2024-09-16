import { z } from "@org/lib-commons";

export const RestError500Schema = z
  .object({
    status: z.number().openapi({
      example: 400,
    }),
    message: z.string().openapi({
      example: "The server cannot or will not process the request due to an apparent client error.",
    }),
    timestamp: z.string().openapi({
      example: "2024-01-01T00:00:00.000Z",
    }),
  })
  .describe(
    `<b>Error Handling (4xx & 5xx)</b><br><br>
  This endpoint, along with all others, may return a <b>500 Internal Server Error</b> in cases where the server encounters an unexpected condition that prevented it from fulfilling the request. This error signifies issues within our server or the underlying infrastructure that supports the application.<br><br>
  In addition to the 500 error, responses in the <b>4xx</b> (Client Error) and <b>5xx</b> (Server Error) ranges may be returned. These responses indicate various scenarios in which the request could not be processed either due to an issue with the input provided by the client or a failure within our server-side processing. Clients should handle these responses accordingly.<br><br>
  <b>Note:</b> Always ensure to check the response status and error messages to handle these scenarios gracefully in your application. Proper error handling is essential for maintaining a robust interaction between client applications and our API.
  `,
  )
  .openapi({
    title: "RestError",
    description: "Rest error 500",
  });
