import { z } from "zod";

export const LoginForm = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .openapi({
    title: "Login form",
    description: "Login form",
  });

export type LoginForm = z.infer<typeof LoginForm>;
