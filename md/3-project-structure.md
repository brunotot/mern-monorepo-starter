## Project Structure

<details>

 <summary>Toggle project structure</summary>

```bash
.
├── docs # ------------------ TypeDoc-generated source files
├── .github # ---------------
│   └── workflows # --------- Contains all GitHub-related workflows
├── .husky # ----------------
│   ├── commit-msg # -------- Husky hook which validates Git message format
│   └── pre-commit # -------- Husky hook which executes tasks before commit
├── md # -------------------- Contains markdown chunks to be rendered in README.md
├── packages # --------------
│   ├── backend # ----------- Node.js & Express app source code
│   ├── frontend # ---------- Vite & React app source code
│   └── shared # ------------ Common code to be used by multiple packages
├── scripts # ---------------
│   ├── data # -------------- Contains contextual data for JS scripts to consume
│   ├── js # ---------------- Node.js scripts
│   └── sh # ---------------- Bash scripts
├── .vscode # ---------------
│   ├── launch.json # ------- Contains VSCode launch configurations
│   └── settings.json # ----- Contains common useful VSCode (editor) configurations
├── .commitlintrc # --------- Configuration for commitlint
├── .eslintrc # ------------- Configuration for ESLint
├── .lintstagedrc # --------- Configuration for lintstaged
├── .nvmrc # ---------------- Specifies Node.js version
├── pnpm-workspace.yaml # --- Specifies patterns for recognizing monorepo packages
├── .prettierignore # ------- Specifies ignore patterns for Prettier
├── .prettierrc # ----------- Contains Prettier configuration
├── typedoc.json # ---------- Contains TypeDoc configuration
├── tsconfig.json # --------- Contains TypeScript configuration
└── package.json # ---------- Standard package.json file
```

</details>
