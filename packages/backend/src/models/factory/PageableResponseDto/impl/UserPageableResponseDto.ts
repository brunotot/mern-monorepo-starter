import type z from "zod";
import { User } from "@models/domain/User";
import { PageableResponseDto } from "@models/factory/PageableResponseDto";

export const UserPageableResponseDto = PageableResponseDto(User);

export type UserPageableResponseDto = z.infer<typeof UserPageableResponseDto>;
