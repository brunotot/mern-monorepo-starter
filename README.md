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

- [Understanding the repository name](#understanding-the-repository-name)
- [Installation](#installation)
  - [GitHub repository setup](#github-repository-setup)
  - [Railway setup](#railway-setup)
  - [Local installation](#local-installation)

## Understanding the repository name

**mern**

- The **MERN** stack is a popular set of technologies (MongoDB, Express.js, React, and Node.js) used for full-stack development. This stack is known for its efficiency in building scalable and performance-oriented web applications. By employing the MERN stack, this repo provides a robust foundation for developing modern web applications with TypeScript, ensuring a seamless fullstack experience.

**monorepo**

- A **monorepo** refers to a single repository containing multiple codebases that might otherwise be separated into individual repositories. This approach simplifies dependency management, streamlines workflows, and enhances collaboration across different parts of an application. Our repository utilizes this structure to centralize and unify the development process, ensuring consistency and ease of maintenance.

**starter**

- A **starter** repository is designed to be a starting point for new projects. It includes essential configurations, structures, and code examples to jump-start development without having to set up everything from scratch. This repo is tailored to provide developers with a ready-to-use, comprehensive setup that embodies best practices and modern development standards.

Each element of the repository name has been carefully chosen to reflect the core aspects and intended usage of the project, ensuring that developers can quickly grasp the utility and focus of this monorepo.

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
   - Under **Backend > Settings > Build** set `pnpm run backend:build` as the build command
   - Under **Backend > Settings > Deploy** set `pnpm run backend:start` as the deploy command
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
   - Under **Frontend > Settings > Build** set `pnpm run frontend:build` as the build command
   - Under **Frontend > Settings > Deploy** set `pnpm run frontend:start` as the deploy command
   - That's it! You can now hit the **Deploy** button
   - Optionally you can generate a custom domain name on **Frontend > Settings > Networking > Generate Domain**

   </details>

---

### Local installation

1. Clone the previously created repository to your local machine.

2. Install local packages and run prepare scripts with `pnpm install`.

3. Add required environment variables to `packages/backend/.env.development.local`.

   (Check **step 4** of Railway setup - **Setup Backend service** )

🚀 That's it! Try running `pnpm run backend:dev` or `pnpm run frontend:dev`
