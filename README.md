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
  - [Local installation](#local-installation)
- [Deploy](#deploy)
  - [Deploy with Railway](#deploy-with-railway)
- [Recommended VSCode extensions](#recommended-vscode-extensions)

## What is `typescript-monorepo-starter`?

`typescript-monorepo-starter` is a GitHub template designed to kickstart your next **TypeScript 5** project, offering an opinionated, ready-to-use monorepo structure that takes care of all the tricky configuration for you.

The following [packages](https://github.com/brunotot/typescript-monorepo-starter/tree/main/packages) are implemented and at your disposal:

- [app-node-express](https://expressjs.com/) <sup>[[TS Compiler](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/about), [Express API](https://expressjs.com/en/starter/hello-world.html), [MongoDB](https://www.mongodb.com/company/what-is-mongodb), [Keycloak](https://www.keycloak.org/), [Railway](https://railway.app/)]</sup>
- [app-vite-react](https://reactjs.org/) <sup>[[Vite](https://vitejs.dev/guide/why.html), [ReactJS](https://react.dev/), [Railway](https://railway.app/)]</sup>
- [lib-api-client](https://www.typescriptlang.org/) <sup>[[TS Compiler](https://www.typescriptlang.org/), [ts-rest](https://ts-rest.com/)]</sup>
- [lib-commons](https://www.typescriptlang.org/) <sup>[[TS Compiler](https://www.typescriptlang.org/)]</sup>

## Prerequisites

- **PNPM**
- **Node.js**
- **Git**
- **VS Code** (Optional)

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

---

### Local installation

1. clone previously created repository into your local machine
2. install dependencies with `pnpm install`
3. configure `.env.development.local` variables for **app-node-express** (see env schema defined at [env.setup.ts](https://github.com/brunotot/mern-monorepo-starter/blob/main/packages/app-node-express/src/setup/env.setup.ts#L13))
4. you can now run your **app-node-express** with `pnpm run app-node-express:dev`

## Deploy

### Deploy with Railway

1. create an account on Railway [here](https://railway.app/login)
2. create a new project on Railway's dashboard and connect to your GitHub monorepo
3. within the project, select `+ Create` and choose `From Template`
4. select **`typescript-monorepo-starter`** template
5. finally, deploy changes 🚀

## Recommended VSCode extensions

- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
