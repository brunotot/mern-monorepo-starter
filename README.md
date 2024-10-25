[![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#work-in-progress)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-dark.svg?raw=true">
    <img width="500px" alt="MERN Monorepo starter banner" src="https://github.com/brunotot/mern-monorepo-starter/blob/main/assets/img/logo-light.svg?raw=true">
  </picture>
</p>

## 🧐 What is `mern-monorepo-starter`?

`mern-monorepo-starter` is a GitHub template designed to kickstart your next **TypeScript 5** project, offering an opinionated, ready-to-use monorepo structure that takes care of all the tricky configuration for you.

The following [packages](https://github.com/brunotot/mern-monorepo-starter/tree/main/packages) are implemented and at your disposal:

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

- [🧐 What is `mern-monorepo-starter`?](#-what-is-mern-monorepo-starter)
- [🔧 Prerequisites](#-prerequisites)
- [💻 Installation](#-installation)
  - [GitHub repository setup](#github-repository-setup)
  - [Keycloak installation](#keycloak-installation)
  - [Keycloak realm configuration](#keycloak-realm-configuration)
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

1. <details><summary>Create your repository</summary><hr>Create your monorepo repository using <a href="https://github.com/new?template_name=mern-monorepo-starter&template_owner=brunotot">this template</a>.<hr></details>

2. <details><summary>Configure GitHub permissions</summary><hr>Enable GitHub actions to create and approve pull requests.<hr><ul><li>Go to <b>Settings</b> > <b>Actions</b> > <b>General</b> > <b>Workflow permissions</b></li><li>Enable the following settings:<ul><li>✅ <code>Read and write permissions</code></li><li>✅ <code>Allow GitHub Actions to create and approve pull requests</code></li></ul><li>Save changes.</li></li></ul></details>

3. <details><summary>Configure GitHub actions</summary>Run existing actions for the first time.<ul><li>Go to <b>Actions</b> > <b>typedoc-generator.yml</b></li><li>Click on the <code>Run workflow</code> button.</li><li>Repeat the process for all <code>test-</code> prefixed workflows.</li><li>After all workflows finish, navigate to <b>Settings</b> > <b>Pages</b>.</li><li>Select the <code>gh-pages</code> branch as the deployment source.</li><li>Save changes.</li></ul></details>

4. <details><summary>Configure GitHub ci</summary>Configure branch protection rules to prevent direct pushes to the  <code>main</code> branch, require pull requests for merging, and all status checks to pass before merging.<ul><li>Set the branch name pattern to <code>main</code>.</li><li>Enable the following settings:<ul><li>✅<code>Require a pull request before merging</code></li><li>✅<code>Require status checks to pass before merging</code></li><li>✅<code>Require branches to be up to date before merging</code></li></ul></li><li>Disable the setting:<ul><li>❌ <code>Require approvals</code></li></ul></li><li>Select the following workflows as required for all pull requests:<ul><li><b>test-app-node-express</b></li><li><b>test-app-vite-react</b></li><li><b>test-lib-commons</b></li><li><b>test-lib-api-client</b></li></ul></li><li>Save changes.</li></ul></details>

### Keycloak installation

1. <details><summary>Download Keycloak binary</summary>Download links can be found <a href="https://www.keycloak.org/downloads">here</a>.<hr></details>

2. <details><summary>Unpack files to a desired destination</summary></details>

3. <details><summary>Run Keycloak in dev mode</summary><pre>sh [PATH_TO_KC]/bin/kc.sh start-dev</pre><hr></details>

### Keycloak realm configuration

1. <details><summary>Add admin user (realm-level)</summary><ul><li>Open <a href="http://localhost:8080">http://localhost:8080</a> to access Keycloak admin GUI</li><li>Enter your admin user credentials (which you use for your future logins)</li><li>Save and login to Keycloak admin GUI</li></ul></details>

2. <details><summary>Create a client for your app</summary><ul><li>Navigate to <strong>Clients > Create client</strong></li><li>Enter client data</li><ul><li>Client type: <strong>OpenID Connect</strong></li><li>Client id: <strong>app-vite-react</strong></li><li>Client authentication: <strong>Off</strong></li><li>Authorization: <strong>Off</strong></li><li>Authentication flow: <strong>Standard flow, Implicit flow & Direct access grants</strong></li><li>Valid redirect URIs: <strong>*</strong></li><li>Valid post logout redirect URIs: <strong>*</strong></li><li>Web origins: <strong>*</strong></li></ul><li>Save client</li></ul><hr></details>

3. <details><summary>Add roles to your app client</summary><ul><li>Open <strong>app-vite-react</strong> client</li><li>Navigate to <strong>Roles</strong> tab</li><li>Click on <strong>Create role</strong></li><li>Add the following roles: <ul><li><strong>avr-admin</strong></li><li><strong>avr-user</strong></li></ul></li></ul><hr></details>

4. <details><summary>Set role <strong>avr-admin</strong> on <strong>admin</strong> user</summary><ul><li>Open <strong>admin</strong> user details</li><li>Navigate to <strong>Role mapping</strong> tab</li><li>Click on <strong>Assign role</strong> and select <strong>avr-admin</strong> role</li></ul><hr></details>

5. <details><summary>Configure <strong>admin-cli</strong> client</summary><ul><li>Open <strong>admin-cli</strong> client details</li><li>On <strong>Settings</strong> tab choose the same options as defined in 2nd step with exception of setting Client authentication to <strong>On</strong> and also checking the <strong>Service accounts roles</strong> checkbox</li><li>On <strong>Credentials</strong> tab choose Client Authenticator: <strong>Client Id and Secret</strong> and generate a <strong>Client Secret</strong></li><li>Copy the secret, you will put it in project's .env file</li><li>Save changes</li></ul><hr></details>

### Local installation

1. <details><summary>Clone to local machine</summary><hr>Clone previously created repository into your local machine.<pre>git clone https://github.com/YOUR_USER/YOUR_REPO.git</pre><hr></details>

2. <details><summary>Install dependencies</summary><hr>Install dependencies with <code>pnpm</code>.<pre>pnpm install</pre><hr></details>

3. <details><summary>Configure environment variables</summary><hr>Configure <code>.env.development.local</code> variables for <b>app-node-express</b> (see env schema defined at <a href="https://github.com/brunotot/mern-monorepo-starter/blob/main/packages/app-node-express/src/server/env.ts#L13">@org/app-node-express/env</a>)<hr></details>

4. <details><summary>Rename project labels</summary><hr>Configure <code>.env</code> variables, located at root of monorepo (see env file defined at <a href="https://github.com/brunotot/mern-monorepo-starter/blob/main/env.ts#L13">@org/env</a>). Afterwards, run the rename script<pre>pnpm run renameProjectLabels</pre><hr></details>

5. <details><summary>Run a sample app locally</summary><hr>You can now run your <b>app-node-express</b> with:<pre>pnpm run app-node-express:dev</pre><hr></details>

## 🚢 Deploy

### Deploy with Railway

1. <details><summary>Create new account on Railway</summary><hr>You can create your Railway account <a href="https://railway.app/login">here</a><hr></details>

2. <details><summary>Create new Railway project</summary><hr>Create a new project through Railway's dashboard and connect it to your GitHub monorepo<hr></details>

3. <details><summary>Import template to your Railway project</summary><hr><ul><li>Within the project, select <code>+ Create</code> and choose <code>From Template</code></li><li>Select <b><code>mern-monorepo-starter</code></b></li><li>Follow through with setup (and environment variables)</li></ul><hr></details>

4. <details><summary>Deploy</summary><hr>Deploy all project changes by clicking <code>Deploy</code> button 🚀<hr></details>

## 🧩 Recommended VSCode extensions

- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
