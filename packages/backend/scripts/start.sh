#!/bin/bash

PWD_THIS=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source "${PWD_THIS}/shared/spinner.sh"
source "${PWD_THIS}/shared/colors.sh"

PWD_BACKEND="$PWD_THIS/.."

APP="$1"
VERSION="$2"

export PACKAGE_JSON_VERSION=$(grep -o '\"version\": *\"[^\"]*\"' package.json | awk -F'\"' '{print $4}')

rm -rf dist

start "" " $(color $CYAN)1.$(color) Compiling shared package"
cd "${PWD_BACKEND}/../shared" && rm -rf dist && npx tsc
stop "$(color $GREEN)✓$(color)"

start "" " $(color $CYAN)2.$(color) Compiling backend package"
cd "${PWD_BACKEND}" && rm -rf dist && npx tsc
stop "$(color $GREEN)✓$(color)"

start "" " $(color $CYAN)3.$(color) Converting path aliases to relative paths"
npx tsc-alias -p "${PWD_BACKEND}/tsconfig.json"
stop "$(color $GREEN)✓$(color)"

echo -e "\n$(color $GREEN)✓ $(color $CYAN)4.$(color) Starting...\n"
node --no-warnings --loader ts-node/esm --experimental-specifier-resolution=node "${PWD_BACKEND}/dist/main.js"

#
#
#
#export PACKAGE_JSON_VERSION=$(grep -o '\"version\": *\"[^\"]*\"' package.json | awk -F'\"' '{print $4}')
#node --no-warnings --loader ts-node/esm --experimental-specifier-resolution=node ./dist/main.js

echo -e "\n"