<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/brunotot/monorepo-mern-railway-starter/blob/main/assets/img/logo-dark.svg?raw=true">
    <img width="500px" alt="MERN Monorepo starter banner" src="https://github.com/brunotot/monorepo-mern-railway-starter/blob/main/assets/img/logo-light.svg?raw=true">
  </picture>
</p>

<p align="center">
  <img alt="TypeScript badge" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="React badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="Express badge" src="https://img.shields.io/badge/Express-404D59?style=for-the-badge&logo=express">
  <img alt="MongoDB badge" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
</p>

TOC

- [Why](#why)
- [Installation](#installation)
  - [GitHub repository setup](#github-repository-setup)
  - [Railway setup](#railway-setup)
  - [Local installation](#local-installation)
- [Dependencies overview](#dependencies-overview)
- [Project directory structure and overview](#project-directory-structure-and-overview)

## Why

The motivation behind creating this MERN monorepo starter was to simplify the process of full application development and deployment. We aimed to craft a GitHub repository that serves as a comprehensive guide for developers—whether it's me or anyone else in the developer community. The core idea was to provide a central, ready-to-use setup that encapsulates all best practices for using a monorepo with a 100% TypeScript implementation.

This repository is designed to streamline the entire workflow, from local development to full-scale deployment on cloud platforms, starting with Railway. Future updates will include detailed steps for other platforms like Heroku to ensure flexibility and broader applicability. By following the instructions laid out in this template, developers can deploy a production-ready application on Railway, equipped with robust CI/CD pipelines, automated documentation generation, comprehensive testing, and much more.

The goal is to remove the complexities typically associated with setting up and deploying modern web applications, allowing developers to focus more on building great features and less on the intricacies of the deployment and operational processes.

## Installation

### GitHub repository setup

1. Create new repository from `@mern-monorepo-starter` template [here](https://github.com/new?template_name=monorepo-mern-railway-starter&template_owner=brunotot).

2. Navigate to **Repo > Settings > Actions - General** and save the following **workflow** options:

   - [x] Read and write permissions
   - [x] Allow GitHub Actions to create and approve pull requests

3. Navigate to **Repo > Actions > typedoc.yml** and click on **Run workflow**.

4. After **typedoc.yml** finishes, the `gh-pages` branch is generated.

   Navigate to **Repo > Settings > Pages** and save the `gh-pages` branch as the deployment branch.

🚀 That's it! Now your GitHub repository is ready to be used for deployment through Railway client.

---

### Railway setup

1. Create an account on Railway [here](https://railway.app/login).

2. On Railway **Dashboard** click on **+ New project > Empty project**.

3. After project is successfully created, you may update its name at **Project Settings - General > Name**.

<!--2. Install `@railway/cli` if you don't have it already

   ```sh
   npm i -g @railway/cli
   ```

3. Now you have access to the **railway** command. See [Railway CLI documentation](https://docs.railway.app/reference/cli-api)

   ```sh
   railway --help
   ```

4. Login to Railway CLI

   ```sh
   railway login
   ```

5. Create a new Railway project

   ```sh
   railway init
   ```-->

> [!NOTE]
> Automatic service generation and setup will be enabled once the `railway` CLI resolves existing bugs that are currently causing issues.

> [!WARNING]
> The upcoming steps, except for the **MongoDB** service, require at least a `Hobby` plan on your Railway account, which starts at $5 per month.

4. Create project services

   <details>

      <summary>Setup <b>MongoDB</b> service</summary>

   - Create MongoDB service by clicking on **New > Database > Add MongoDB**
   - Under **MongoDB Service > Data** create `test` database
   - Under **MongoDB Service > Data** create `production` database
   - Under **MongoDB Service > Data** create `development` database
   - Under **MongoDB Service > Variables** section, find and store the value of `MONGO_URL` locally

   </details>

   <details>

      <summary>Setup <b>Backend</b> service</summary>

   - Create Backend service by clicking on **New > GitHub Repo**
   - Connect your repository to your Railway project
   - Edit service name to `Backend`
   - Under **Backend > Settings > Build** set `pnpm --filter backend run build` as the build command
   - Under **Backend > Settings > Deploy** set `pnpm --filter backend run start` as the deploy command
   - Add the following environment variables:
     - **MONGO_URL** = {the connection string copied from `setup MongoDB service` section}
     - **MONGO_DATABASE** = production
     - **ACCESS_TOKEN_SECRET** = accessTokenSecret
     - **REFRESH_TOKEN_SECRET** = refreshTokenSecret
   - That's it! You can now hit the **Deploy** button
   - Optionally you can generate a custom domain name on **Backend > Settings > Networking > Generate Domain**

   </details>

   <details>

      <summary>Setup <b>Frontend</b> service</summary>

   - Create Frontend service by clicking on **New > GitHub Repo**
   - Connect your repository to your Railway project
   - Edit service name to `Frontend`
   - Under **Frontend > Settings > Build** set `pnpm --filter frontend run build` as the build command
   - Under **Frontend > Settings > Deploy** set `pnpm --filter frontend run start` as the deploy command
   - That's it! You can now hit the **Deploy** button
   - Optionally you can generate a custom domain name on **Frontend > Settings > Networking > Generate Domain**

   </details>

---

### Local installation

1. Clone the previously created repository to your local machine.

2. Install local packages and run prepare scripts with `pnpm install`.

3. Add required environment variables to `packages/backend/.env.development.local`.

   (Check **step 4** of Railway setup - **Setup Backend service** )

🚀 That's it! Try running `pnpm --filter backend run dev` or `pnpm --filter frontend run dev`

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
    <td>Contains shared code, models, and types used by both the backend and frontend</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API in the backend</td>
   </tr>
   <tr>
    <td>@ts-rest/express</td>
    <td align="right">^3.45.0</td>
    <td>Integrates the @ts-rest/core library with Express.js in the backend</td>
   </tr>
   <tr>
    <td>@ts-rest/open-api</td>
    <td align="right">^3.45.0</td>
    <td>Generates OpenAPI documentation from the @ts-rest/core API in the backend</td>
   </tr>
   <tr>
    <td>bcrypt</td>
    <td align="right">^5.1.1</td>
    <td>Used for hashing and verifying user passwords in the backend</td>
   </tr>
   <tr>
    <td>body-parser</td>
    <td align="right">^1.20.2</td>
    <td>Parses incoming request bodies in the Express.js middleware in the backend</td>
   </tr>
   <tr>
    <td>bottlejs</td>
    <td align="right">^2.0.1</td>
    <td>Inversion of Control (IoC) container for dependency injection in the backend</td>
   </tr>
   <tr>
    <td>compression</td>
    <td align="right">^1.7.4</td>
    <td>Compresses responses to reduce data transfer in the backend</td>
   </tr>
   <tr>
    <td>cookie-parser</td>
    <td align="right">^1.4.6</td>
    <td>Parses cookie headers in incoming requests in the backend</td>
   </tr>
   <tr>
    <td>cors</td>
    <td align="right">^2.8.5</td>
    <td>Provides a middleware for enabling CORS in the Express.js app in the backend</td>
   </tr>
   <tr>
    <td>cross-dirname</td>
    <td align="right">^0.1.0</td>
    <td>Utility for getting the directory path of a file in the backend</td>
   </tr>
   <tr>
    <td>dotenv</td>
    <td align="right">^16.4.5</td>
    <td>Loads environment variables from .env files in the backend</td>
   </tr>
   <tr>
    <td>express</td>
    <td align="right">^4.18.2</td>
    <td>The web framework used for building the backend API</td>
   </tr>
   <tr>
    <td>express-rate-limit</td>
    <td align="right">^7.2.0</td>
    <td>Provides rate limiting to protect against brute force attacks in the backend</td>
   </tr>
   <tr>
    <td>helmet</td>
    <td align="right">^7.1.0</td>
    <td>Collection of security middleware for Express.js in the backend</td>
   </tr>
   <tr>
    <td>hpp</td>
    <td align="right">^0.2.3</td>
    <td>Protects against HTTP Parameter Pollution attacks in the backend</td>
   </tr>
   <tr>
    <td>jsonwebtoken</td>
    <td align="right">^9.0.2</td>
    <td>Used for generating and verifying JSON Web Tokens (JWT) in the backend</td>
   </tr>
   <tr>
    <td>mongodb</td>
    <td align="right">^6.5.0</td>
    <td>The official MongoDB driver for Node.js used in the backend</td>
   </tr>
   <tr>
    <td>morgan</td>
    <td align="right">^1.10.0</td>
    <td>HTTP request logger middleware for Express.js in the backend</td>
   </tr>
   <tr>
    <td>swagger-jsdoc</td>
    <td align="right">^6.2.8</td>
    <td>Generates OpenAPI documentation from JSDoc comments in the backend</td>
   </tr>
   <tr>
    <td>swagger-ui-express</td>
    <td align="right">^5.0.0</td>
    <td>Renders the Swagger UI for the OpenAPI documentation in the backend</td>
   </tr>
   <tr>
    <td>winston</td>
    <td align="right">^3.11.0</td>
    <td>Logging library used for application logging in the backend</td>
   </tr>
   <tr>
    <td>winston-daily-rotate-file</td>
    <td align="right">^5.0.0</td>
    <td>Winston transport for logging to a rotating file in the backend</td>
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
    <td>Used by Material-UI for styling React components in the frontend</td>
   </tr>
   <tr>
    <td>@emotion/styled</td>
    <td align="right">^11.11.0</td>
    <td>Used by Material-UI for styling React components in the frontend</td>
   </tr>
   <tr>
    <td>@mui/icons-material</td>
    <td align="right">^5.15.14</td>
    <td>Provides Material Design icons for use in the frontend UI</td>
   </tr>
   <tr>
    <td>@mui/lab</td>
    <td align="right">5.0.0-alpha.169</td>
    <td>Provides additional components and utilities from Material-UI for the frontend UI</td>
   </tr>
   <tr>
    <td>@mui/material</td>
    <td align="right">^5.15.14</td>
    <td>The core Material-UI library for building the frontend UI</td>
   </tr>
   <tr>
    <td>@mui/styles</td>
    <td align="right">^5.15.14</td>
    <td>Used by Material-UI for styling React components in the frontend</td>
   </tr>
   <tr>
    <td>@mui/x-tree-view</td>
    <td align="right">^7.0.0</td>
    <td>Provides a TreeView component from Material-UI for displaying hierarchical data in the frontend</td>
   </tr>
   <tr>
    <td>@org/shared</td>
    <td align="right">workspace:*</td>
    <td>Contains shared code, models, and types used by both the backend and frontend</td>
   </tr>
   <tr>
    <td>@preact/signals-react</td>
    <td align="right">^2.0.1</td>
    <td>Provides a way to use Preact signals in React components for the frontend</td>
   </tr>
   <tr>
    <td>@tanstack/react-query</td>
    <td align="right">^5.32.1</td>
    <td>Used for data fetching and caching in the frontend React application</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API in the backend</td>
   </tr>
   <tr>
    <td>@ts-rest/react-query</td>
    <td align="right">^3.45.0</td>
    <td>Integrates @tanstack/react-query with the @ts-rest/core API for the frontend</td>
   </tr>
   <tr>
    <td>axios</td>
    <td align="right">^1.6.8</td>
    <td>Used for making HTTP requests in the frontend React application</td>
   </tr>
   <tr>
    <td>i18next</td>
    <td align="right">^23.10.1</td>
    <td>Provides internationalization (i18n) support for the frontend UI</td>
   </tr>
   <tr>
    <td>i18next-browser-languagedetector</td>
    <td align="right">^7.2.0</td>
    <td>Detects the user's language in the browser for i18n in the frontend</td>
   </tr>
   <tr>
    <td>i18next-http-backend</td>
    <td align="right">^2.5.0</td>
    <td>Loads translation files from the server for i18n in the frontend</td>
   </tr>
   <tr>
    <td>material-ui-popup-state</td>
    <td align="right">^5.1.0</td>
    <td>Provides a state management solution for popups and menus in the Material-UI frontend UI</td>
   </tr>
   <tr>
    <td>react</td>
    <td align="right">^18.2.0</td>
    <td>The core React library used for building the frontend UI</td>
   </tr>
   <tr>
    <td>react-dom</td>
    <td align="right">^18.2.0</td>
    <td>Provides DOM-specific methods for React in the frontend UI</td>
   </tr>
   <tr>
    <td>react-i18next</td>
    <td align="right">^14.1.0</td>
    <td>Integrates i18next with React for internationalization in the frontend UI</td>
   </tr>
   <tr>
    <td>react-router-dom</td>
    <td align="right">^6.22.3</td>
    <td>Provides routing functionality for the React frontend application</td>
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
    <td>Used for generating OpenAPI documentation from Zod schemas in the backend</td>
   </tr>
   <tr>
    <td>@ts-rest/core</td>
    <td align="right">^3.45.0</td>
    <td>Core library for building the TypeScript REST API in the backend</td>
   </tr>
   <tr>
    <td>@ts-rest/open-api</td>
    <td align="right">^3.45.0</td>
    <td>Generates OpenAPI documentation from the @ts-rest/core API in the backend</td>
   </tr>
   <tr>
    <td>http-status</td>
    <td align="right">^1.7.4</td>
    <td>Utility for working with HTTP status codes in the backend</td>
   </tr>
   <tr>
    <td>zod</td>
    <td align="right">^3.22.5</td>
    <td>TypeScript-first schema validation library used throughout the project</td>
   </tr>
  </tbody>
 </table>

</details>

## Project directory structure and overview

<details>

  <summary>Expand directories</summary>

<strong><code>.github</code></strong>

- `workflows/typedoc.yml` - responsible for generating TypeDoc web app source and publishing it to `gh-pages`

<strong><code>.husky</code></strong>

- `commit-msg` - validates the commit message format (runs before `pre-commit`)
- `pre-commit` - verifies the code is ready for commit (testing, linting, etc.) and auto-regenerates main **README. md** file with the latest changes at **{projectRoot}/md** directory

<strong><code>.vscode</code></strong>

- `settings.json` - contains useful default VSCode settings, used for localizing VSCode settings to the monorepo itself.
- `launch.json` - contains debug configurations for various tasks and scripts throughout the monorepo.

  <details>

     <summary>Show configurations</summary>

  - **root > install**
  - **root > lint**
  - **root > test**
  - **root > typedoc**
  - **root > clean**
  - **script > writeDependenciesMarkdown**
  - **script > writeReadmeMarkdown**
  - **backend > dev - debug**
  - **backend > dev - nodemon**
  - **backend > test**
  - **backend > clean**
  - **backend > build**
  - **frontend > dev**
  - **frontend > test**
  - **frontend > build**
  - **frontend > clean**
  - **frontend > loadTranslationTypes**
  - **shared > clean**
  - **shared > build**
  - **shared > test**

  </details>

<strong><code>assets</code></strong>

- `img` - contains images consumed by the GitHub README

<strong><code>md</code></strong>

- Contains markdown files in the following format - `{N}-    {component}.md` which are used to update the main README (runs before commit).
  - **{N}** - defines sorting order for README TOC
  - **{component}** - defines the name of the section inside README.md

<strong><code>packages</code></strong>

- `backend` - Node & Express app
- `frontend` - Vite & React app
- `shared` - package which supplies the apps with types and utilities (eg. sharing REST API endpoint types across platforms)

<strong><code>scripts</code></strong>

- `data` - contains data files used by NodeJS and Shell scripts.
- `writeDependenciesMarkdown.js` - updates `md/4-dependencies.    md`
- `writeReadmeMarkdown.js` - updates `README.md`
- `customizeTypedocOutput.sh` - updates `docs/assets` with custom configurations

<strong><code>README</code></strong>md`

- auto-generated via **`scripts/writeReadmeMarkdown.js`**

</details>
