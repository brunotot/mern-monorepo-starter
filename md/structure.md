# Project Structure

This document provides an overview of the repository's structure, detailing the purpose and functionality of each component.

```bash
├── packages
│   ├── backend
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── decorators
│   │   │   ├── infrastructure
│   │   │   ├── logs
│   │   │   ├── types
│   │   │   ├── App.ts
│   │   │   ├── index.ts
│   │   │   ├── main.ts
│   │   │   └── server.ts
│   │   ├── test
│   │   │   ├── dump
│   │   │   ├── setup
│   │   │   └── user.test.ts
│   │   ├── nodemon.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── typedoc.json
│   │   └── vitest.config.js
│   ├── frontend
│   │   ├── src
│   │   │   ├── core
│   │   │   ├── models
│   │   │   ├── pages
│   │   │   ├── @types
│   │   │   ├── utils
│   │   │   ├── index.ts
│   │   │   ├── main.css
│   │   │   ├── main.tsx
│   │   │   ├── routes.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── typedoc.json
│   │   └── vite.config.ts
│   └── shared
│       ├── src
│       │   ├── config
│       │   ├── models
│       │   ├── types
│       │   ├── utils
│       │   ├── web
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── typedoc.json
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.build.json
└── tsconfig.json
```
