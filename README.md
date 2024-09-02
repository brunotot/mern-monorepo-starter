[![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#work-in-progress)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-dark.svg?raw=true">
    <img width="500px" alt="MERN Monorepo starter banner" src="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-light.svg?raw=true">
  </picture>
</p>

## 🧐 What is `typescript-monorepo-starter`?

`typescript-monorepo-starter` is a GitHub template designed to kickstart your next **TypeScript 5** project, offering an opinionated, ready-to-use monorepo structure that takes care of all the tricky configuration for you.

The following [packages](https://github.com/brunotot/typescript-monorepo-starter/tree/main/packages) are implemented and at your disposal:

- [app-node-express](https://expressjs.com/) <sup>[[TS Compiler](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/about), [Express API](https://expressjs.com/en/starter/hello-world.html), [MongoDB](https://www.mongodb.com/company/what-is-mongodb), [Keycloak](https://www.keycloak.org/), [Railway](https://railway.app/)]</sup>
- [app-vite-react](https://reactjs.org/) <sup>[[Vite](https://vitejs.dev/guide/why.html), [ReactJS](https://react.dev/), [Railway](https://railway.app/)]</sup>
- [lib-api-client](https://www.typescriptlang.org/) <sup>[[TS Compiler](https://www.typescriptlang.org/), [ts-rest](https://ts-rest.com/)]</sup>
- [lib-commons](https://www.typescriptlang.org/) <sup>[[TS Compiler](https://www.typescriptlang.org/)]</sup>

<p align="center">
  <img alt="MongoDB badge" src="https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=02ED64">
  <img alt="Express badge" src="https://img.shields.io/badge/Express-404D59?style=for-the-badge&logo=express">
  <img alt="React badge" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node-404D59?style=for-the-badge&logo=Node.js&logoColor=43853D">
</p>

TOC

- [🧐 What is `typescript-monorepo-starter`?](#-what-is-typescript-monorepo-starter)
- [🔧 Prerequisites](#-prerequisites)
- [💻 Installation](#-installation)
  - [GitHub repository setup](#github-repository-setup)
  - [Local installation](#local-installation)
- [🚢 Deploy](#-deploy)
  - [Deploy with Railway](#deploy-with-railway)
- [🧩 Recommended VSCode extensions](#-recommended-vscode-extensions)

## 🔧 Prerequisites

- **PNPM**
- **Node.js**
- **Git**
- **VS Code** (Optional)

## 💻 Installation

### GitHub repository setup

1. <details><summary>Create your repository</summary>Create your monorepo repository using <a href="https://github.com/new?template_name=mern-monorepo-starter&template_owner=brunotot">this template</a>.</details>

2. <details><summary>Configure GitHub permissions</summary>Enable GitHub actions to create and approve pull requests.<ul><li>Go to <b>Settings</b> > <b>Actions</b> > <b>General</b> > <b>Workflow permissions</b></li><li>Enable the following settings:<ul><li>✅ <i>Read and write permissions</i></li><li>✅ <i>Allow GitHub Actions to create and approve pull requests</i></li></ul></li></ul></details>

3. <details><summary>Configure GitHub actions</summary>Run existing actions for the first time.<ul><li>Go to <b>Actions</b> > <b>typedoc-generator.yml</b></li><li>Click on the <code>Run workflow</code> button.</li><li>Repeat the process for all <code>test-</code> prefixed workflows.</li><li>After all workflows finish, navigate to <b>Settings</b> > <b>Pages</b>.</li><li>Select the <code>gh-pages</code> branch as the deployment source.</li><li>Save changes.</li></ul></details>

4. <details><summary>Configure GitHub ci</summary>Configure branch protection rules to prevent direct pushes to the  <code>main</code> branch, require pull requests for merging, and all status checks to pass before merging.<ul><li>Set the branch name pattern to <code>main</code>.</li><li>Enable the following settings:<ul><li>✅<code>Require a pull request before merging</code></li><li>✅<code>Require status checks to pass before merging</code></li><li>✅<code>Require branches to be up to date before merging</code></li></ul></li><li>Disable the setting:<ul><li>❌ <code>Require approvals</code></li></ul></li><li>Select the following workflows as required for all pull requests:<ul><li><b>test-app-node-express</b></li><li><b>test-app-vite-react</b></li><li><b>test-lib-commons</b></li><li><b>test-lib-api-client</b></li></ul></li><li>Save changes.</li></ul></details>

### Local installation

<details>
<summary>1. <b>Clone to local machine</b></summary>

Clone previously created repository into your local machine.

```sh
git clone https://github.com/YOUR_USER/YOUR_REPO.git
```

</details>

<details>
<summary>2. <b>Install dependencies</b></summary>

Install dependencies with `pnpm`

```sh
pnpm install
```

</details>

<details>
<summary>3. <b>Configure environment variables</b></summary>

Configure `.env.development.local` variables for **app-node-express** (see env schema defined at [env.setup.ts](https://github.com/brunotot/mern-monorepo-starter/blob/main/packages/app-node-express/src/setup/env.setup.ts#L13))

</details>

<details>
<summary>4. <b>Run a sample app locally</b></summary>

You can now run your **app-node-express** with `pnpm run app-node-express:dev`

</details>

## 🚢 Deploy

### Deploy with Railway

1. create an account on Railway [here](https://railway.app/login)
2. create a new project on Railway's dashboard and connect to your GitHub monorepo
3. within the project, select `+ Create` and choose `From Template`
4. select **`typescript-monorepo-starter`** template
5. finally, deploy changes 🚀

## 🧩 Recommended VSCode extensions

- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
