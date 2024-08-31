## Installation

### GitHub repository setup

1. create your repository from [this](https://github.com/new?template_name=mern-monorepo-starter&template_owner=brunotot) template 
2. configure your GitHub workflow permissions
   - navigate to **Settings** / **Actions** / **General** / **Workflow permissions**
   - select option `Read and write permissions`
   - select option `Allow GitHub Actions to create and approve pull requests`
   - save configuration
3. configure [Typedoc](https://typedoc.org/) deployment to [GitHub Pages](https://pages.github.com/)
   - navigate to **Actions** / **typedoc-generator.yml**
   - click on `Run workflow` button
   - after workflow is finished, navigate to **Settings** / **Pages**
   - save `gh-pages` branch as the deployment branch 

----

### Local installation

1. clone previously created repository into your local machine
2. install dependencies with `pnpm install`
3. configure `.env.development.local` variables for **app-node-express** (see env schema defined at [env.setup.ts](https://github.com/brunotot/mern-monorepo-starter/blob/main/packages/app-node-express/src/setup/env.setup.ts#L13))
4. you can now run your **app-node-express** with `pnpm run app-node-express:dev`