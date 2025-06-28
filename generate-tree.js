const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] || ".";
const IGNORE = [
  ".env",
  "books.sqlite",
  "structure.txt",
  "node_modules",
  ".git",
];

// Set the maximum depth (0 = root only, 1 = root + 1 level, etc.)
const MAX_DEPTH = 4;

// Define your preferred root order:
const ROOT_ORDER = [
  "docs",
  "public",
  "server",
  ".env.example",
  ".gitignore",
  "generate-tree.js",
  "LICENSE",
  "package-lock.json",
  "package.json",
  "README.md",
  "tailwind.config.js",
];

function printTree(dir, prefix = "", customOrder = null, depth = 0) {
  if (depth > MAX_DEPTH) return;

  let items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => !IGNORE.includes(f.name));

  // If custom order is provided, use it
  if (customOrder) {
    const ordered = [];
    customOrder.forEach((name) => {
      const found = items.find((f) => f.name === name);
      if (found) ordered.push(found);
    });
    // Add any items not in the custom order at the end
    items.forEach((f) => {
      if (!customOrder.includes(f.name)) ordered.push(f);
    });
    items = ordered;
  }

  items.forEach((item, idx) => {
    const isLast = idx === items.length - 1;
    const connector = isLast ? "\\-- " : "|-- ";
    const fullPath = path.join(dir, item.name);
    output.push(prefix + connector + item.name);
    if (item.isDirectory()) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(fullPath, nextPrefix, null, depth + 1);
    }
  });
}

// Output to structure.txt
const output = [];
const rootName = path.basename(path.resolve(ROOT));
output.push(rootName);
printTree(ROOT, "", ROOT_ORDER, 0);

fs.writeFileSync("structure.txt", output.join("\n"));
console.log("Tree written to structure.txt in custom root order and depth.");
