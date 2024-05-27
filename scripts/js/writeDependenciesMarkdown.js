import fs from "fs";
import path from "path";
import { getDirname } from "cross-dirname";
import { exec } from "child_process";

const PACKAGES_DIR_PATH = "./../../packages";
const PATH_TO_DEPENDENCIES_JSON = "./../data/dependencies.json";
const PATH_TO_DEPENDENCIES_MD = "./../../md/7-dependencies.md";

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
    const packagePath = pathFromDir(PACKAGES_DIR_PATH, packageFolder, "package.json");
    const dependencies = readDependencies(packagePath);
    dependenciesByFolder[packageFolder] = dependencies;
  }

  return dependenciesByFolder;
}

function updateDependencyDescriptions(dependencies) {
  try {
    let dependencyDescriptions = readJsonFile(pathFromDir(PATH_TO_DEPENDENCIES_JSON));

    for (const [dependency, description] of Object.entries(dependencies)) {
      if (!dependencyDescriptions.hasOwnProperty(dependency)) {
        dependencyDescriptions[dependency] = "-";
      }
    }

    fs.writeFileSync(
      pathFromDir(PATH_TO_DEPENDENCIES_JSON),
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
    const packagePath = pathFromDir(PACKAGES_DIR_PATH, packageName, "package.json");
    const dependencies = readDependencies(packagePath);
    updateDependencyDescriptions(dependencies);
  }
}

function generateMarkdownTables(packageDependencies, packageDescriptions) {
  const detailsList = Object.entries(packageDependencies).map(([packageName, dependencies]) => {
    return (
      "<details>\n" +
      "\n" +
      ` <summary>${packageName}</summary>\n` +
      "\n" +
      " <table>\n" +
      "  <thead>\n" +
      "   <tr>\n" +
      "    <th>Name</th>\n" +
      "    <th>Version</th>\n" +
      "    <th>Description</th>\n" +
      "   </tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      `${Object.entries(dependencies)
        .map(
          ([dependencyName, version]) =>
            "   <tr>\n" +
            `    <td>${dependencyName}</td>\n` +
            `    <td align="right">${version}</td>\n` +
            `    <td>${packageDescriptions[dependencyName]}</td>\n` +
            `   </tr>\n`,
        )
        .join("")}` +
      "  </tbody>\n" +
      " </table>\n" +
      "\n" +
      `</details>\n`
    );
  });

  return detailsList;
}

function writeToDependenciesMd(markdownTables) {
  try {
    const stream = fs.createWriteStream(pathFromDir(PATH_TO_DEPENDENCIES_MD));

    stream.write(`## Dependencies overview\n\n`);
    for (const markdownTable of markdownTables) {
      //stream.write(`### ${packageName}\n\n`);
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
  const packageDescriptions = readJsonFile(pathFromDir(PATH_TO_DEPENDENCIES_JSON));

  if (Object.values(packageDescriptions).some(descr => descr === "-")) {
    console.log(
      `Some dependencies are missing descriptions at ${pathFromDir(PATH_TO_DEPENDENCIES_JSON)}`,
    );
    console.log("Aborting...");
    process.exit(1);
  }

  const packageDependencies = getDependenciesFromPackages();
  const markdownTables = generateMarkdownTables(packageDependencies, packageDescriptions);
  writeToDependenciesMd(markdownTables);
  runPrettierOnFile(pathFromDir(PATH_TO_DEPENDENCIES_MD));
  addFileToGit(pathFromDir(PATH_TO_DEPENDENCIES_MD), pathFromDir(PATH_TO_DEPENDENCIES_JSON));
}

main();
