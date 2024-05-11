# backend

| Name                      | Version      | Description                                                                   |
| ------------------------- | ------------ | ----------------------------------------------------------------------------- |
| @org/shared               | workspace:\* | Contains shared code, models, and types used by both the backend and frontend |
| @ts-rest/core             | ^3.45.0      | Core library for building the TypeScript REST API in the backend              |
| @ts-rest/express          | ^3.45.0      | Integrates the @ts-rest/core library with Express.js in the backend           |
| @ts-rest/open-api         | ^3.45.0      | Generates OpenAPI documentation from the @ts-rest/core API in the backend     |
| bcrypt                    | ^5.1.1       | Used for hashing and verifying user passwords in the backend                  |
| body-parser               | ^1.20.2      | Parses incoming request bodies in the Express.js middleware in the backend    |
| bottlejs                  | ^2.0.1       | Inversion of Control (IoC) container for dependency injection in the backend  |
| compression               | ^1.7.4       | Compresses responses to reduce data transfer in the backend                   |
| cookie-parser             | ^1.4.6       | Parses cookie headers in incoming requests in the backend                     |
| cors                      | ^2.8.5       | Provides a middleware for enabling CORS in the Express.js app in the backend  |
| cross-dirname             | ^0.1.0       | Utility for getting the directory path of a file in the backend               |
| dotenv                    | ^16.4.5      | Loads environment variables from .env files in the backend                    |
| express                   | ^4.18.2      | The web framework used for building the backend API                           |
| express-rate-limit        | ^7.2.0       | Provides rate limiting to protect against brute force attacks in the backend  |
| helmet                    | ^7.1.0       | Collection of security middleware for Express.js in the backend               |
| hpp                       | ^0.2.3       | Protects against HTTP Parameter Pollution attacks in the backend              |
| jsonwebtoken              | ^9.0.2       | Used for generating and verifying JSON Web Tokens (JWT) in the backend        |
| mongodb                   | ^6.5.0       | The official MongoDB driver for Node.js used in the backend                   |
| morgan                    | ^1.10.0      | HTTP request logger middleware for Express.js in the backend                  |
| swagger-jsdoc             | ^6.2.8       | Generates OpenAPI documentation from JSDoc comments in the backend            |
| swagger-ui-express        | ^5.0.0       | Renders the Swagger UI for the OpenAPI documentation in the backend           |
| winston                   | ^3.11.0      | Logging library used for application logging in the backend                   |
| winston-daily-rotate-file | ^5.0.0       | Winston transport for logging to a rotating file in the backend               |
| zod                       | ^3.22.5      | TypeScript-first schema validation library used throughout the project        |

# frontend

| Name                             | Version         | Description                                                                                     |
| -------------------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| @emotion/react                   | ^11.11.4        | Used by Material-UI for styling React components in the frontend                                |
| @emotion/styled                  | ^11.11.0        | Used by Material-UI for styling React components in the frontend                                |
| @mui/icons-material              | ^5.15.14        | Provides Material Design icons for use in the frontend UI                                       |
| @mui/lab                         | 5.0.0-alpha.169 | Provides additional components and utilities from Material-UI for the frontend UI               |
| @mui/material                    | ^5.15.14        | The core Material-UI library for building the frontend UI                                       |
| @mui/styles                      | ^5.15.14        | Used by Material-UI for styling React components in the frontend                                |
| @mui/x-tree-view                 | ^7.0.0          | Provides a TreeView component from Material-UI for displaying hierarchical data in the frontend |
| @org/shared                      | workspace:\*    | Contains shared code, models, and types used by both the backend and frontend                   |
| @preact/signals-react            | ^2.0.1          | Provides a way to use Preact signals in React components for the frontend                       |
| @tanstack/react-query            | ^5.32.1         | Used for data fetching and caching in the frontend React application                            |
| @ts-rest/core                    | ^3.45.0         | Core library for building the TypeScript REST API in the backend                                |
| @ts-rest/react-query             | ^3.45.0         | Integrates @tanstack/react-query with the @ts-rest/core API for the frontend                    |
| axios                            | ^1.6.8          | Used for making HTTP requests in the frontend React application                                 |
| i18next                          | ^23.10.1        | Provides internationalization (i18n) support for the frontend UI                                |
| i18next-browser-languagedetector | ^7.2.0          | Detects the user's language in the browser for i18n in the frontend                             |
| i18next-http-backend             | ^2.5.0          | Loads translation files from the server for i18n in the frontend                                |
| material-ui-popup-state          | ^5.1.0          | Provides a state management solution for popups and menus in the Material-UI frontend UI        |
| react                            | ^18.2.0         | The core React library used for building the frontend UI                                        |
| react-dom                        | ^18.2.0         | Provides DOM-specific methods for React in the frontend UI                                      |
| react-i18next                    | ^14.1.0         | Integrates i18next with React for internationalization in the frontend UI                       |
| react-router-dom                 | ^6.22.3         | Provides routing functionality for the React frontend application                               |

# shared

| Name                 | Version | Description                                                               |
| -------------------- | ------- | ------------------------------------------------------------------------- |
| @anatine/zod-openapi | ^2.2.5  | Used for generating OpenAPI documentation from Zod schemas in the backend |
| @ts-rest/core        | ^3.45.0 | Core library for building the TypeScript REST API in the backend          |
| @ts-rest/open-api    | ^3.45.0 | Generates OpenAPI documentation from the @ts-rest/core API in the backend |
| http-status          | ^1.7.4  | Utility for working with HTTP status codes in the backend                 |
| zod                  | ^3.22.5 | TypeScript-first schema validation library used throughout the project    |
