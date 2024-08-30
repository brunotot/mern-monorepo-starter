#!/bin/bash
PWD_THIS=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "${PWD_THIS}/.."
./tools/mongodb-database-tools/bin/mongodump --uri=\"$1\" --out=./test/dump/ --authenticationDatabase admin
mv ./test/dump/test/* ./test/dump
rmdir ./test/dump/test
