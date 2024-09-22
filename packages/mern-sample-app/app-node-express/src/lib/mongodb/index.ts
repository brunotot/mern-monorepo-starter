/**
 * @packageDocumentation
 * 
 * ## Overview
 * This module provides MongoDB integration for the Express application, including a `MongoDatabaseService` class for managing 
 * the MongoDB client and handling transactions, and a `MongoRepository` abstract class for implementing data access layers with 
 * CRUD operations, pagination, and searching capabilities. The module also includes types for filtering, sorting, and searching in MongoDB collections.
 * 
 * ## Features
 * - **MongoDB Client Management**: The `MongoDatabaseService` manages the MongoDB connection and transactions, with support for automatic rollback and commit.
 * - **CRUD Operations**: The `MongoRepository` class provides an abstraction for CRUD operations (`find`, `insert`, `update`, and `delete`) on MongoDB collections.
 * - **Pagination Support**: Built-in pagination methods for efficiently handling large datasets.
 * - **Search and Filtering**: Supports regex-based search and advanced filtering across MongoDB documents.
 * - **Session Management**: Integrates with Express route context for handling MongoDB sessions.
 * 
 * ## How to Use
 * 
 * ### Initialize MongoDB Client
 * ```ts
 * import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
 * 
 * const dbService = MongoDatabaseService.getInstance();
 * dbService.client = MongoDatabaseService.buildMongoClient();
 * await dbService.client.connect();
 * ```
 * 
 * ### Use the MongoRepository for CRUD Operations
 * ```ts
 * import { MongoRepository } from "@org/app-node-express/lib/mongodb";
 * 
 * class MyRepository extends MongoRepository<MyDocument> {
 *   constructor() {
 *     super(MyDocumentSchema, ["name", "email"]);
 *   }
 * }
 * 
 * const repo = new MyRepository();
 * const allDocuments = await repo.findAll();
 * const paginatedResults = await repo.findAllPaginated({ page: 1, rowsPerPage: 10 });
 * ```
 * 
 * ### MongoDB Transactions
 * ```ts
 * const session = dbService.client.startSession();
 * await dbService.startTransaction(session);
// perform database operations...
 * await dbService.commitTransaction(session);
 * ```
 * 
 * ## Customization
 * - **Repository Customization**: Extend the `MongoRepository` class to implement additional methods or adjust the default CRUD behavior for your collections.
 * - **Advanced Search and Filter**: Use the `buildMatchPipeline` and `buildSortPipeline` methods for complex querying of MongoDB collections.
 * - **Transaction Handling**: Customize the transaction handling in `MongoDatabaseService` by overriding `commitTransaction` or `rollbackTransaction` methods for advanced use cases.
 */

export * from "./MongoDatabaseService";
export * from "./MongoTypes";
export * from "./MongoRepository";
