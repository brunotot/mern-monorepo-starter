#!/usr/bin/env node

import "zx/globals";
import inquirer from "inquirer";

const TEMPLATE_REPO = "brunotot/monorepo-mern-railway-starter";

const { ownerHandle, repoHandle, repoVisibility, repoDescription } = await inquirer.prompt([
  {
    name: "ownerHandle",
    message: "[1/4] Your GitHub username:",
    default: "brunotot",
  },
  {
    name: "repoHandle",
    message: "[2/4] Repository name:",
    default: "my-mern-monorepo",
  },
  {
    name: "repoVisibility",
    message: "[3/4] Repository visibility:",
    choices: ["Public", "Private", "Internal"],
    type: "list",
  },
  {
    name: "repoDescription",
    message: "[4/4] Repository description:",
    default: "",
  },
]);

try {
  const res =
    await $`gh repo create ${repoHandle} --template ${TEMPLATE_REPO} --${repoVisibility.toLowerCase()} --description ${repoDescription ?? " "}`;
  console.log(res.stdout);
} catch (error) {
  console.log(error);
}
