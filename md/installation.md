## Installation

### GitHub repository setup

1. Create new repository from `@mern-monorepo-starter` template [here](https://github.com/new?template_name=monorepo-mern-railway-starter&template_owner=brunotot).

2. Navigate to **Repo > Settings > Actions - General** and save the following Workflow-related options:

   1. `Read and write permissions` checked
   2. `Allow GitHub Actions to create and approve pull requests` checked

3. Navigate to **Repo > Actions > typedoc.yml** and click on **Run workflow**

4. After **typedoc.yml** finishes,  the `gh-pages` branch is generated.

   Navigate to **Repo > Settings > Pages** and save the `gh-pages` branch as the deployment branch.

5. That's it! Now your GitHub repository is ready to be used for deployment through Railway client

---

### Local installation

1. Clone the previously created repository to your local machine

2. Install local packages and run prepare scripts with `pnpm install`

---

### Railway setup

1. Create an account on Railway [here](https://railway.app/login)

2. On Railway **Dashboard** click on **+ New project > Empty project**

3. After project is successfully created, you may update its name at **Project Settings - General > Name**

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

      <summary>setup <b>MongoDB</b> service</summary>

      1. create MongoDB service by clicking on **New > Database > Add MongoDB**
      2. under **MongoDB Service > Data** create `test` database
      3. under **MongoDB Service > Data** create `production` database
      4. under **MongoDB Service > Data** create `development` database
      5. under **MongoDB Service > Variables** section, find and store the value of `MONGO_URL` locally

   </details>

   <details>

      <summary>setup <b>Backend</b> service</summary>

      6. create Backend service by clicking on **New > GitHub Repo**
      7. connect your repository to your Railway project
      8. edit service name to `Backend`
      9. under **Backend > Settings > Build** set `pnpm run backend:build` as the build command
      10. under **Backend > Settings > Deploy** set `pnpm run backend:start` as the deploy command
      11. add the following environment variables:
         - **MONGO_URL** = {the connection string copied from `setup MongoDB service` section}
         - **MONGO_DATABASE** = production
         - **ACCESS_TOKEN_SECRET** = accessTokenSecret
         - **REFRESH_TOKEN_SECRET** = refreshTokenSecret
      12. that's it! You can now hit the **Deploy** button
      13. Optionally you can generate a custom domain name on **Backend > Settings > Networking > Generate Domain**

   </details>

   <details>

      <summary>setup <b>Frontend</b> service</summary>

      14. create Frontend service by clicking on **New > GitHub Repo**
      15. connect your repository to your Railway project
      16. edit service name to `Frontend`
      17. under **Frontend > Settings > Build** set `pnpm run frontend:build` as the build command
      18. under **Frontend > Settings > Deploy** set `pnpm run frontend:start` as the deploy command
      19. that's it! You can now hit the **Deploy** button
      20. Optionally you can generate a custom domain name on **Frontend > Settings > Networking > Generate Domain**

   </details>
