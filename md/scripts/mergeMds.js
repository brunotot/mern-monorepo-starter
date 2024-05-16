import { readFile, writeFile } from "fs/promises";
import { exec } from "child_process";
import { getDirname } from "cross-dirname";
import path from "path";
import toc from "markdown-toc";

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
    console.log("File formatted with Prettier!");
  });
}

async function mergeMarkdownFiles(filePaths, outputFilePath) {
  try {
    const firstMd = await readFile(filePaths[0], { encoding: "utf8" });

    let combinedContent = "";

    for (let i = 1; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const content = await readFile(filePath, { encoding: "utf8" });
      combinedContent += content + "\n";
    }

    const tocTitle = "TOC";
    const tocContent = toc(firstMd + "\n" + combinedContent).content;

    const md = firstMd + "\n" + tocTitle + "\n\n" + tocContent + "\n\n" + combinedContent;

    await writeFile(outputFilePath, md);

    // Run prettier to format the output file
    runPrettierOnFile(outputFilePath);
  } catch (error) {
    console.error(`Failed to merge files: ${error}`);
  }
}

// Example usage
const markdownFiles = [
  //`${pathFromDir("./../overview.md")}`,
  `${pathFromDir("./../banner.md")}`,
  `${pathFromDir("./../project-name-meaning.md")}`,
  `${pathFromDir("./../installation.md")}`,
];
const outputFilePath = `${pathFromDir("./output.md")}`;

mergeMarkdownFiles(markdownFiles, outputFilePath);
