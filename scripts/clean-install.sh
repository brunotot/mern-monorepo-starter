rm -rf node_modules
rm -rf packages/backend/node_modules
rm -rf packages/frontend/node_modules
rm -rf packages/shared/node_modules

pnpm install

pnpm install --prefix packages/backend
pnpm install --prefix packages/frontend

pnpm run backend:build
pnpm run frontend:build

