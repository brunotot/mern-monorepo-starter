## Dependencies overview

<details>

 <summary>backend</summary>

 <table>
  <thead>
   <tr>
    <th>Name</th>
    <th>Version</th>
    <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td>@org/shared</td>
    <td align="right">workspace:*</td>
    <td>Contains shared code, models, and types used other packages</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API</td>
   </tr>
   <tr>
    <td>@ts-rest/express</td>
    <td align="right">^3.45.0</td>
    <td>Integrates the @ts-rest/core library with Express.js</td>
   </tr>
   <tr>
    <td>@ts-rest/open-api</td>
    <td align="right">^3.45.0</td>
    <td>Generates OpenAPI documentation from the @ts-rest/core API</td>
   </tr>
   <tr>
    <td>bcrypt</td>
    <td align="right">^5.1.1</td>
    <td>Used for hashing and verifying user passwords</td>
   </tr>
   <tr>
    <td>body-parser</td>
    <td align="right">^1.20.2</td>
    <td>Parses incoming request bodies in the Express.js middleware</td>
   </tr>
   <tr>
    <td>bottlejs</td>
    <td align="right">^2.0.1</td>
    <td>Inversion of Control (IoC) container for dependency injection</td>
   </tr>
   <tr>
    <td>compression</td>
    <td align="right">^1.7.4</td>
    <td>Compresses responses to reduce data transfer</td>
   </tr>
   <tr>
    <td>cookie-parser</td>
    <td align="right">^1.4.6</td>
    <td>Parses cookie headers in incoming requests</td>
   </tr>
   <tr>
    <td>cors</td>
    <td align="right">^2.8.5</td>
    <td>Provides a middleware for enabling CORS in the Express.js app</td>
   </tr>
   <tr>
    <td>cross-dirname</td>
    <td align="right">^0.1.0</td>
    <td>Utility for getting the directory path of a file</td>
   </tr>
   <tr>
    <td>dotenv</td>
    <td align="right">^16.4.5</td>
    <td>Loads environment variables from .env files</td>
   </tr>
   <tr>
    <td>express</td>
    <td align="right">^4.18.2</td>
    <td>The web framework used for building the backend API</td>
   </tr>
   <tr>
    <td>express-rate-limit</td>
    <td align="right">^7.2.0</td>
    <td>Provides rate limiting to protect against brute force attacks</td>
   </tr>
   <tr>
    <td>flatted</td>
    <td align="right">^3.3.1</td>
    <td>-</td>
   </tr>
   <tr>
    <td>helmet</td>
    <td align="right">^7.1.0</td>
    <td>Collection of security middleware for Express.js</td>
   </tr>
   <tr>
    <td>hpp</td>
    <td align="right">^0.2.3</td>
    <td>Protects against HTTP Parameter Pollution attacks</td>
   </tr>
   <tr>
    <td>jsonwebtoken</td>
    <td align="right">^9.0.2</td>
    <td>Used for generating and verifying JSON Web Tokens (JWT)</td>
   </tr>
   <tr>
    <td>mongodb</td>
    <td align="right">^6.5.0</td>
    <td>The official MongoDB driver for Node.js used</td>
   </tr>
   <tr>
    <td>morgan</td>
    <td align="right">^1.10.0</td>
    <td>HTTP request logger middleware for Express.js</td>
   </tr>
   <tr>
    <td>swagger-jsdoc</td>
    <td align="right">^6.2.8</td>
    <td>Generates OpenAPI documentation from JSDoc comments</td>
   </tr>
   <tr>
    <td>swagger-ui-express</td>
    <td align="right">^5.0.0</td>
    <td>Renders the Swagger UI for the OpenAPI documentation</td>
   </tr>
   <tr>
    <td>winston</td>
    <td align="right">^3.11.0</td>
    <td>Logging library used for application logging</td>
   </tr>
   <tr>
    <td>winston-daily-rotate-file</td>
    <td align="right">^5.0.0</td>
    <td>Winston transport for logging to a rotating file</td>
   </tr>
   <tr>
    <td>zod</td>
    <td align="right">^3.22.5</td>
    <td>TypeScript-first schema validation library used throughout the project</td>
   </tr>
  </tbody>
 </table>

</details>

<details>

 <summary>frontend</summary>

 <table>
  <thead>
   <tr>
    <th>Name</th>
    <th>Version</th>
    <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td>@emotion/react</td>
    <td align="right">^11.11.4</td>
    <td>Used by Material-UI for styling React components</td>
   </tr>
   <tr>
    <td>@emotion/styled</td>
    <td align="right">^11.11.0</td>
    <td>Used by Material-UI for styling React components</td>
   </tr>
   <tr>
    <td>@mui/icons-material</td>
    <td align="right">^5.15.14</td>
    <td>Provides Material Design icons for use</td>
   </tr>
   <tr>
    <td>@mui/lab</td>
    <td align="right">5.0.0-alpha.169</td>
    <td>Provides additional components and utilities from Material-UI</td>
   </tr>
   <tr>
    <td>@mui/material</td>
    <td align="right">^5.15.14</td>
    <td>The core Material-UI library for building web UI</td>
   </tr>
   <tr>
    <td>@mui/styles</td>
    <td align="right">^5.15.14</td>
    <td>Used by Material-UI for styling React components</td>
   </tr>
   <tr>
    <td>@mui/x-tree-view</td>
    <td align="right">^7.0.0</td>
    <td>Provides a TreeView component from Material-UI for displaying hierarchical data</td>
   </tr>
   <tr>
    <td>@org/shared</td>
    <td align="right">workspace:*</td>
    <td>Contains shared code, models, and types used other packages</td>
   </tr>
   <tr>
    <td>@preact/signals-react</td>
    <td align="right">^2.0.1</td>
    <td>Provides a way to use Preact signals in React components for the frontend</td>
   </tr>
   <tr>
    <td>@tanstack/react-query</td>
    <td align="right">^5.32.1</td>
    <td>Used for data fetching and caching</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API</td>
   </tr>
   <tr>
    <td>@ts-rest/react-query</td>
    <td align="right">^3.45.0</td>
    <td>Integrates @tanstack/react-query with the @ts-rest/core API for the frontend</td>
   </tr>
   <tr>
    <td>axios</td>
    <td align="right">^1.6.8</td>
    <td>Used for making HTTP requests</td>
   </tr>
   <tr>
    <td>i18next</td>
    <td align="right">^23.10.1</td>
    <td>Provides internationalization (i18n) support</td>
   </tr>
   <tr>
    <td>i18next-browser-languagedetector</td>
    <td align="right">^7.2.0</td>
    <td>Detects the user's language in the browser for i18n</td>
   </tr>
   <tr>
    <td>i18next-http-backend</td>
    <td align="right">^2.5.0</td>
    <td>Loads translation files from the server for i18n</td>
   </tr>
   <tr>
    <td>material-ui-popup-state</td>
    <td align="right">^5.1.0</td>
    <td>Provides a state management solution for popups and menus in the Material-UI frontend UI</td>
   </tr>
   <tr>
    <td>react</td>
    <td align="right">^18.2.0</td>
    <td>The core React library used for building web UI</td>
   </tr>
   <tr>
    <td>react-dom</td>
    <td align="right">^18.2.0</td>
    <td>Provides DOM-specific methods for React</td>
   </tr>
   <tr>
    <td>react-i18next</td>
    <td align="right">^14.1.0</td>
    <td>Integrates i18next with React for internationalization</td>
   </tr>
   <tr>
    <td>react-router-dom</td>
    <td align="right">^6.22.3</td>
    <td>Provides routing functionality for the React frontend application</td>
   </tr>
   <tr>
    <td>react-use</td>
    <td align="right">^17.5.0</td>
    <td>-</td>
   </tr>
  </tbody>
 </table>

</details>

<details>

 <summary>shared</summary>

 <table>
  <thead>
   <tr>
    <th>Name</th>
    <th>Version</th>
    <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td>@anatine/zod-openapi</td>
    <td align="right">^2.2.5</td>
    <td>Extends all Zod types with z.openapi(metadata) method</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API</td>
   </tr>
   <tr>
    <td>@ts-rest/open-api</td>
    <td align="right">^3.45.0</td>
    <td>Generates OpenAPI documentation from the @ts-rest/core API</td>
   </tr>
   <tr>
    <td>http-status</td>
    <td align="right">^1.7.4</td>
    <td>Utility for working with HTTP status codes</td>
   </tr>
   <tr>
    <td>zod</td>
    <td align="right">^3.22.5</td>
    <td>TypeScript-first schema validation library used throughout the project</td>
   </tr>
  </tbody>
 </table>

</details>
