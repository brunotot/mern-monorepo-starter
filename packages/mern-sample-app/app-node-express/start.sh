#!/bin/bash

PWD_THIS=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PWD="${PWD_THIS}/../../.."

# Imports
source "${PWD}/assets/sh/spinner.sh"
source "${PWD}/assets/sh/colors.sh"

#start "" " $(color $CYAN)1.$(color) Building lib-commons"
npm run build --prefix "${PWD}/packages/mern-sample-app/lib-commons" --silent
#stop "$(color $GREEN)✓$(color)"

#start "" " $(color $CYAN)2.$(color) Building lib-api-client"
npm run build --prefix "${PWD}/packages/mern-sample-app/lib-api-client" --silent
#stop "$(color $GREEN)✓$(color)"

#start "" " $(color $CYAN)3.$(color) Building app-node-express"
npm run build --prefix "${PWD}/packages/mern-sample-app/app-node-express" --silent
#stop "$(color $GREEN)✓$(color)"

#echo -e "\n$(color $GREEN)✓ $(color $CYAN)4.$(color) Starting...\n"
export SERVER_VERSION=$(grep -o '\"version\": *\"[^\"]*\"' package.json | awk -F'\"' '{print $4}')
node --no-warnings --loader ts-node/esm --experimental-specifier-resolution=node "${PWD}/packages/mern-sample-app/app-node-express/dist/main.js"

#echo -e "\n"