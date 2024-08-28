import { readFileSync, writeFileSync } from "fs";

const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(commitMsgFile, "utf8").trim();

const emojiMap = {
  feat: "✨",
  fix: "🐛",
  docs: "📚",
  style: "💎",
  refactor: "🛠️",
  perf: "⚡",
  test: "🧪",
  build: "🏗️",
  ci: "👷",
  chore: "🧹",
  revert: "⏪",
};

const commitRegex = /^(\w+):\s(.+)$/;
const match = commitRegex.exec(commitMsg);

if (match) {
  const type = match[1];
  const message = match[2];
  const emoji = emojiMap[type];

  if (emoji) {
    const newCommitMsg = `${emoji} ${type}: ${message}`;
    writeFileSync(commitMsgFile, newCommitMsg);
  }
}
