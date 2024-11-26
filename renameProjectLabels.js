/* eslint-disable no-undef */
/* eslint-disable no-console */

import fs from "fs";
import path from "path";

import dotenv from "dotenv";

const dirname = process.cwd();

// 4. Function to read from ".env" file
/**
 * Reads an env file and returns an object with key-value pairs.
 * @param envFilePath - Path to the .env file
 * @returns object - Parsed key-value pairs from the .env file
 */
const readEnvFile = envFilePath => {
  if (!fs.existsSync(envFilePath)) {
    throw new Error(`.env file not found at path: ${envFilePath}`);
  }

  // Parse the .env file using dotenv
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

  // Return it as an object
  return envConfig;
};

// Read environment variables from the .env file
const envFilePath = path.join(dirname, ".env"); // Adjust the path to your .env file
let envVariables = {};
try {
  envVariables = readEnvFile(envFilePath);
  console.log("Loaded Env Variables:", envVariables);
} catch (error) {
  console.error(error);
}

// Access the values you need for search and replace
const customConfig = {
  ghRepoHandle: envVariables.GH_REPO_HANDLE || "mern-monorepo-starter",
  ghAuthorHandle: envVariables.GH_AUTHOR_HANDLE || "brunotot",
  ghAuthorName: envVariables.GH_AUTHOR_NAME || "Bruno Tot",
  customAppId: envVariables.CUSTOM_APP_ID || "mern-sample-app",
  customAppName: envVariables.CUSTOM_APP_NAME || "MERN Sample App",
};

// Example usage of the customConfig object
console.log("Custom Configuration for Search and Replace:", customConfig);

// 1. Path to directory under which the script will recursively find files
const directoryPath = dirname;

// 2. String array specifying which file names and folder names should be excluded from the search
const excludedFiles = [
  "node_modules",
  ".git",
  "dist",
  "docs",
  "tools",
  ".env",
  "dump",
  "pnpm-lock.yaml",
  "README.md",
];

/**
 * Recursively find all files in a directory, excluding specified files and folders.
 * @param dir - The directory path to start searching from.
 * @returns string[] - An array of file paths.
 */
const getAllFiles = dir => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Check if file or folder is in the exclusion list
    if (excludedFiles.includes(file)) {
      return; // Skip excluded files or folders
    }

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath)); // Recursively get files from subdirectories
    } else {
      results.push(filePath); // Add file to results
    }
  });

  return results;
};

/**
 * Replace hardcoded values in a file based on the customConfig.
 * @param filePath - The path to the file where replacements should be made.
 * @param replacements - An object containing search and replace strings.
 */
const replaceInFile = (filePath, replacements) => {
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Perform replacements
  for (const [searchValue, replaceValue] of Object.entries(replacements)) {
    const regex = new RegExp(searchValue, "g");
    fileContent = fileContent.replace(regex, replaceValue);
  }

  // Write the updated content back to the file
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Replaced content in file: ${filePath}`);
};

// Main function to execute the replacements
// prettier-ignore
const main = () => {
  // Rename the folder located at packages/{customAppId}
  renameFolder("mern-sample-app", customConfig.customAppId);

  const allFiles = getAllFiles(directoryPath);

  allFiles.forEach(file => {
    replaceInFile(file, {
      "mern-monorepo-starter": customConfig.ghRepoHandle,
      "brunotot": customConfig.ghAuthorHandle,
      "Bruno Tot": customConfig.ghAuthorName,
      "mern-sample-app": customConfig.customAppId,
      "MERN Sample App": customConfig.customAppName,
    });
  });
};

/**
 * Renames the folder located at packages/{customAppId} to the one read from the .env file.
 * @param oldFolderName - The current folder name (from the default or existing appId).
 * @param newFolderName - The new folder name (from the .env file).
 */
const renameFolder = (oldFolderName, newFolderName) => {
  const oldFolderPath = path.join(dirname, "packages", oldFolderName);
  const newFolderPath = path.join(dirname, "packages", newFolderName);

  if (oldFolderName === newFolderName) {
    console.log(`Folder already has the correct name: ${oldFolderName}`);
    return;
  }

  if (fs.existsSync(oldFolderPath)) {
    if (!fs.existsSync(newFolderPath)) {
      fs.renameSync(oldFolderPath, newFolderPath);
      console.log(`Renamed folder: ${oldFolderPath} -> ${newFolderPath}`);
    } else {
      console.error(`Cannot rename folder: ${newFolderName} already exists.`);
    }
  } else {
    console.error(`Cannot rename folder: ${oldFolderPath} does not exist.`);
  }
};

main();
