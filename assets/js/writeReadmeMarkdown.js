import { readFile, writeFile } from "fs/promises";
import { exec } from "child_process";
import { getDirname } from "cross-dirname";
import path from "path";
import toc from "markdown-toc";
import fs from "fs";

const MARKDOWN_DIR_PATH = pathFromDir("../../", "readme-toc");
const PATH_TO_README_MARKDOWN = pathFromDir("../../", "README.md");
const MATCH_NUMBERED_MARKDOWN = /^(\d+)-(.*)$/;

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

// Read the directory
fs.readdir(MARKDOWN_DIR_PATH, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }

  const markdownFiles = [];
  for (const file of files) {
    if (!file.isFile()) continue;
    const name = file.name;
    if (!name.match(MATCH_NUMBERED_MARKDOWN)) continue;
    markdownFiles.push(`${MARKDOWN_DIR_PATH}/${name}`);
  }

  mergeMarkdownFiles(markdownFiles, PATH_TO_README_MARKDOWN);
});
