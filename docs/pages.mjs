import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

function getFiles(dir) {
  return fs.readdirSync(dir).flatMap((item) => {
    const currentPath = path.join(dir, item);
    if (fs.statSync(currentPath).isDirectory()) {
      return {
        dir: true,
        name: item,
        path: currentPath,
      };
    }

    return {
      dir: false,
      name: item,
      path: currentPath,
    };
  });
}

function asPage(item) {
  // 01.Introduction -> Introduction
  // 01.Welcome.md -> Welcome
  const title = item.name.split(".")[1];

  if (item.dir) {
    return {
      title: title,
      content: getFiles(item.path).map((item) => asPage(item)),
    };
  }

  return {
    title: title,
    content: fs.readFileSync(item.path).toString(),
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetPagesPath = path.join(__dirname, "pages");

const pages = getFiles(targetPagesPath).map((item) => asPage(item));

export default pages;
