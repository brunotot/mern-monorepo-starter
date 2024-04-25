import { z } from "zod";

export const LoginResponse = z.object({
  accessToken: z.string().openapi({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI5MjIwNjI5LCJleHAiOjE2MjkyMjA3Mjl9.1",
  }),
});

export type LoginResponse = z.infer<typeof LoginResponse>;
