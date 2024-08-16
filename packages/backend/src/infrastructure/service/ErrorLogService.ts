import { PaginationOptions, type TODO } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import { type ErrorLog } from "@org/shared";
import { autowired } from "@org/backend/decorators/autowired";

export class ErrorLogService {
  @autowired errorLogRepository: ErrorLogRepository;

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<ErrorLog>> {
    return this.errorLogRepository.search(PaginationOptions.parse(options));
  }

  async findAll(): Promise<ErrorLog[]> {
    return this.errorLogRepository.findAll() as TODO;
  }

  async create(errorLog: ErrorLog): Promise<ErrorLog> {
    return this.errorLogRepository.insertOne(errorLog) as TODO;
  }
}
