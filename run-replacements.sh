#!/bin/bash

# Define the path to the original script
REPLACE_SCRIPT="./replace-string.sh"

# Define your target directory where replacements will happen
TARGET_DIR="./"

# Example exclude patterns (e.g., node_modules, .git, etc.)
EXCLUDE_PATTERNS="node_modules,.git,dist,docs,pnpm-lock.yaml"

# Call the replace script with sample string replacements
echo "Starting replacements..."

# Example 1: Replace "mern-sample-app" with "mern-bober-app"
$REPLACE_SCRIPT "mern-sample-app" "mern-bober-app" "$TARGET_DIR" "$EXCLUDE_PATTERNS"

# Example 2: Replace "app-vite-react" with "frontend-app"
#$REPLACE_SCRIPT "app-vite-react" "frontend-app" "$TARGET_DIR" "$EXCLUDE_PATTERNS"

# Example 3: Replace "app-node-express" with "backend-api"
#$REPLACE_SCRIPT "app-node-express" "backend-api" "$TARGET_DIR" "$EXCLUDE_PATTERNS"

# Example 4: Replace "lib-commons" with "shared-lib"
#$REPLACE_SCRIPT "lib-commons" "shared-lib" "$TARGET_DIR" "$EXCLUDE_PATTERNS"

# Example 5: Replace "lib-api-client" with "api-contracts"
#$REPLACE_SCRIPT "lib-api-client" "api-contracts" "$TARGET_DIR" "$EXCLUDE_PATTERNS"

echo "Replacements completed."
