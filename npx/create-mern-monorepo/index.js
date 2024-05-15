#!/usr/bin/env node

import inquirer from "inquirer";

(async () => {
  const result = await inquirer.prompt([
    {
      name: "repositoryOwner",
      message: 'Repository owner (eg. "john-doe"):',
      default: "@me",
      prefix: "[1/4]",
    },
    {
      name: "repositoryHandle",
      message: 'Repository handle (eg. "my-mern-monorepo"):',
      prefix: "[2/4]",
    },
    {
      name: "repositoryVisibility",
      message: "Repository visibility:",
      choices: ["Public", "Private"],
      type: "list",
      default: "Public",
      prefix: "[3/4]",
    },
    {
      name: "repositoryDescription",
      message: "Repository description (leave blank if none):",
      prefix: "[4/4]",
      default: "",
    },
  ]);
  console.log(result);
})();
