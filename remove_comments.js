const fs = require("fs");
const path = require("path");

function removeComments(content, ext) {
  if ([".ts", ".tsx", ".js", ".jsx", ".css", ".scss"].includes(ext)) {
    
    
    
    const pattern =
      /(\"(?:\\\\|\\\"|[^\"])*\"|\'(?:\\\\|\\\'|[^\'])*\'|`(?:\\\\|\\`|[^`])*`)|(\/\*[\s\S]*?\*\/|\/\/.*)/g;

    return content.replace(pattern, (match, string, comment) => {
      if (comment) {
        return "";
      }
      return string;
    });
  }
  return content;
}

function processDirectory(directory) {
  const excludedDirs = new Set([
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "out",
  ]);
  const allowedExtensions = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".css",
    ".scss",
  ]);

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stats = fs.statSync(filepath);

      if (stats.isDirectory()) {
        if (!excludedDirs.has(file)) {
          walk(filepath);
        }
      } else {
        const ext = path.extname(file);
        if (allowedExtensions.has(ext)) {
          try {
            const content = fs.readFileSync(filepath, "utf8");
            const newContent = removeComments(content, ext);

            if (newContent !== content) {
              fs.writeFileSync(filepath, newContent, "utf8");
              console.log(`Processed: ${filepath}`);
            }
          } catch (err) {
            console.error(`Error processing ${filepath}: ${err.message}`);
          }
        }
      }
    }
  }

  walk(directory);
}

const targetDir = "c:\\Users\\Marvan\\Desktop\\BePositive.az";
processDirectory(targetDir);
