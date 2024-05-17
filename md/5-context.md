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
