export const VAR_ALLOWED_ORIGINS = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:5173",
] as const;

export type AllowedOrigin = (typeof VAR_ALLOWED_ORIGINS)[number];
