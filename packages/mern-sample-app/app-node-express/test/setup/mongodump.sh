#!/bin/bash

MONGO_URL=$1
MONGO_DATABASE=$2

PWD_THIS=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PWD="${PWD_THIS}/../../../.."
PWD_APP_NODE_EXPRESS="${PWD}/packages/mern-sample-app/app-node-express"
PWD_MONGODB_TOOLS_BIN="${PWD}/packages/mern-sample-app/app-node-express/tools/mongodb-database-tools/bin"
PWD_TEST_DUMP="${PWD_APP_NODE_EXPRESS}/test/dump"

# Imports
source "${PWD}/assets/sh/spinner.sh"
source "${PWD}/assets/sh/colors.sh"

start "" " $(color $CYAN)1.$(color) Generating MongoDB dump"
$PWD_MONGODB_TOOLS_BIN/mongodump --uri=\"$MONGO_URL/$MONGO_DATABASE\" --out=$PWD_TEST_DUMP --authenticationDatabase admin --quiet
stop "$(color $GREEN)✓$(color)"

echo -e "\n$(color $GREEN)✓ $(color $CYAN)2.$(color) Making appropriate changes to the dump"
cd $PWD_APP_NODE_EXPRESS && mv $PWD_TEST_DUMP/$MONGO_DATABASE/* $PWD_TEST_DUMP && rmdir $PWD_TEST_DUMP/$MONGO_DATABASE

echo -e "$(color $GREEN)✓ $(color $CYAN)3.$(color) View imported data at: \n\tpackages/mern-sample-app/app-node-express/test/dump\n"
