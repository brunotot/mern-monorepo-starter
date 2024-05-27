#!/bin/bash

# Check if a directory was provided, otherwise use the current directory
DIR="${1:-.}"

# Use the tree command with depth set to 2 and ignore dist and node_modules
tree -a --dirsfirst -L 2 -I 'CODE_OF_CONDUCT.md|.gitignore|LICENSE|pnpm-lock.yaml|README.md|tsconfig.build.json|npx|_|assets|.git|composite-actions|dist|node_modules' "$DIR"