<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-dark.svg?raw=true">
    <img width="500px" alt="MERN Monorepo starter banner" src="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-light.svg?raw=true">
  </picture>
</p>

<p align="center">
  <img alt="MongoDB badge" src="https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=02ED64">
  <img alt="Express badge" src="https://img.shields.io/badge/Express-404D59?style=for-the-badge&logo=express">
  <img alt="React badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node-404D59?style=for-the-badge&logo=Node.js&logoColor=43853D">
</p>

TOC

- [What is `typescript-monorepo-starter`?](#what-is-typescript-monorepo-starter)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [GitHub repository setup](#github-repository-setup)
  - [Railway setup](#railway-setup)
  - [Local installation](#local-installation)
- [Recommended VSCode extensions](#recommended-vscode-extensions)

## What is `typescript-monorepo-starter`?

`typescript-monorepo-starter` is a GitHub template designed to kickstart your next **TypeScript 5** project (with immediate deployment configuration). It provides an opinionated, ready-to-use monorepo structure that handles all the tricky configuration for you (while still allowing you to customize it to your needs).

The following [packages](https://github.com/brunotot/typescript-monorepo-starter/tree/main/packages) are implemented and at your disposal:

- [app-node-express](https://expressjs.com/) <sup>[[TS Compiler](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/about), [Express API](https://expressjs.com/en/starter/hello-world.html), [MongoDB](https://www.mongodb.com/company/what-is-mongodb), [Keycloak](https://www.keycloak.org/), [Railway](https://railway.app/)]</sup>
- [app-vite-react](https://reactjs.org/) <sup>[[Vite](https://vitejs.dev/guide/why.html), [ReactJS](https://react.dev/), [Railway](https://railway.app/)]</sup>
- [pkg-commons](https://www.typescriptlang.org/) <sup>[[TS Compiler](https://www.typescriptlang.org/)]</sup>

## Prerequisites

1. **PNPM**:

   - this monorepo template uses [pnpm](https://pnpm.io/) as the package manager
   - **pnpm** is preferred due to its performance benefits and efficient handling of `node_modules`
   - to install PNPM, please follow the instructions on the [official PNPM website](https://pnpm.io/installation).

2. **Node.js**:

   - ensure you have **Node.js** installed. We recommend using the latest LTS version
   - if you need to install or update Node.js, visit the [official Node.js website](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm)
   - you can check your Node.js version with `node -v`

3. **Git**:

   - **git** is essential for version control and collaboration
   - if **git** is not installed, download and install it from the [official Git website](https://git-scm.com/)
   - you can check your **git** version with `git --version`

4. **VS Code** (Optional):
   - for an enhanced development experience, we recommend using [Visual Studio Code](https://code.visualstudio.com/)
   - install the recommended extensions for a better development workflow
   - this monorepo includes many VS Code configurations for easy debugging throughout the project

## Installation

### GitHub repository setup

1. Create new repository from `@mern-monorepo-starter` template [here](https://github.com/new?template_name=mern-monorepo-starter&template_owner=brunotot).

2. Navigate to **Repo > Settings > Actions - General** and save the following **workflow** options:

   - [x] Read and write permissions
   - [x] Allow GitHub Actions to create and approve pull requests

3. Navigate to **Repo > Actions > typedoc-generator.yml** and click on **Run workflow**.

4. After **typedoc-generator.yml** finishes, the `gh-pages` branch is generated.

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

## Recommended VSCode extensions

- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
