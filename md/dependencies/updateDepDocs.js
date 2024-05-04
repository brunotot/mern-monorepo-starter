import fs from "fs";
import path from "path";
import { getDirname } from "cross-dirname";
import { exec } from "child_process";

const PACKAGES_DIR_PATH = "./../../packages";

const DESCRIPTIONS_FILE_NAME = "dependencyDescriptions.json";
const PACKAGE_JSON_FILE_NAME = "package.json";
const DEPENDENCIES_MD_FILE_NAME = "dependencies.md";

function pathFromDir(...paths) {
  return path.join(getDirname(), ...paths);
}

function runPrettierOnFile(filePath) {
  exec(`npx prettier --write ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Prettier: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Prettier stderr: ${stderr}`);
    }
    //console.log("File formatted with Prettier!");
  });
}

function readJsonFile(filePath) {
  try {
    let json = {};
    if (fs.existsSync(filePath)) {
      json = JSON.parse(fs.readFileSync(filePath));
    }
    return json;
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return {};
  }
}

function readDependencies(packagePath) {
  try {
    const { dependencies } = JSON.parse(fs.readFileSync(packagePath));
    return dependencies || {};
  } catch (error) {
    console.error(`Error reading dependencies from ${packagePath}:`, error);
    return {};
  }
}

function sortObjectKeys(obj) {
  const keys = Object.keys(obj);
  keys.sort();
  const sortedObject = {};
  for (const key of keys) {
    sortedObject[key] = obj[key];
  }
  return sortedObject;
}

function getDependenciesFromPackages() {
  const packageFolders = fs.readdirSync(pathFromDir(PACKAGES_DIR_PATH));
  const dependenciesByFolder = {};

  for (const packageFolder of packageFolders) {
    const packagePath = pathFromDir(PACKAGES_DIR_PATH, packageFolder, PACKAGE_JSON_FILE_NAME);
    const dependencies = readDependencies(packagePath);
    dependenciesByFolder[packageFolder] = dependencies;
  }

  return dependenciesByFolder;
}

function updateDependencyDescriptions(dependencies) {
  try {
    let dependencyDescriptions = readJsonFile(pathFromDir(DESCRIPTIONS_FILE_NAME));

    for (const [dependency, description] of Object.entries(dependencies)) {
      if (!dependencyDescriptions.hasOwnProperty(dependency)) {
        dependencyDescriptions[dependency] = "-";
      }
    }

    fs.writeFileSync(
      pathFromDir(DESCRIPTIONS_FILE_NAME),
      JSON.stringify(sortObjectKeys(dependencyDescriptions), null, 2),
    );
    //console.log("dependencyDescriptions.json updated successfully!");
  } catch (error) {
    console.error("Error updating dependencyDescriptions.json:", error);
  }
}

function updateDescriptionsJson() {
  const packageNames = fs.readdirSync(pathFromDir(PACKAGES_DIR_PATH));

  for (const packageName of packageNames) {
    const packagePath = pathFromDir(PACKAGES_DIR_PATH, packageName, PACKAGE_JSON_FILE_NAME);
    const dependencies = readDependencies(packagePath);
    updateDependencyDescriptions(dependencies);
  }
}

function generateMarkdownTables(packageDependencies, packageDescriptions) {
  const markdownTables = {};

  for (const [packageName, dependencies] of Object.entries(packageDependencies)) {
    const tableRows = Object.entries(dependencies).map(([dependencyName, version]) => {
      const description = packageDescriptions[dependencyName];
      return `| ${dependencyName} | ${version} | ${description} |`;
    });

    const tableHeader = `| Name | Version | Description |\n|------|---------|-------------|`;
    const markdownTable = `${tableHeader}\n${tableRows.join("\n")}`;

    markdownTables[packageName] = markdownTable;
  }

  return markdownTables;
}

function writeToDependenciesMd(markdownTables) {
  try {
    const stream = fs.createWriteStream(pathFromDir(DEPENDENCIES_MD_FILE_NAME));

    for (const [packageName, markdownTable] of Object.entries(markdownTables)) {
      stream.write(`# ${packageName}\n\n`);
      stream.write(markdownTable + "\n\n");
    }

    stream.end();
    //console.log("Dependencies markdown file generated successfully!");
  } catch (error) {
    console.error("Error writing dependencies markdown file:", error);
  }
}

function addFileToGit(...filePaths) {
  for (const filePath of filePaths) {
    exec(`git add ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error adding file to Git: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Git add stderr: ${stderr}`);
      }
    });
  }
}

function main() {
  updateDescriptionsJson();
  const packageDescriptions = readJsonFile(pathFromDir(DESCRIPTIONS_FILE_NAME));

  if (Object.values(packageDescriptions).some(descr => descr === "-")) {
    console.log(
      `Some dependencies are missing descriptions at ${pathFromDir(DESCRIPTIONS_FILE_NAME)}`,
    );
    console.log("Aborting...");
    process.exit(1);
  }

  const packageDependencies = getDependenciesFromPackages();
  const markdownTables = generateMarkdownTables(packageDependencies, packageDescriptions);
  writeToDependenciesMd(markdownTables);
  runPrettierOnFile(pathFromDir(DEPENDENCIES_MD_FILE_NAME));
  addFileToGit(pathFromDir(DEPENDENCIES_MD_FILE_NAME), pathFromDir(DESCRIPTIONS_FILE_NAME));
}

main();
