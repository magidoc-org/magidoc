import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Scans the directory for files and collects them
 * @param {import("node:fs").PathLike} dir The directory to scan the files from
 * @returns {Promise<Array<{ dir: boolean; name: string; path: string; }>>} The files in the directory
 */
async function getFiles(dir) {
  /**
   * @type Array<{ dir: boolean; name: string; path: string; }>
   */
  const result = []
  const dirAsPathString = dir instanceof URL ? fileURLToPath(dir) : dir

  const dirContents = await readdir(dir)

  for (const item of dirContents) {
    const currentPath = join(dirAsPathString, item)

    const currentPathStat = await stat(currentPath)

    result.push({
      dir: currentPathStat.isDirectory(),
      name: item,
      path: currentPath,
    })
  }

  return result
}

/**
 * Get all items as page objects
 * @param {{ dir: boolean; name: string; path: string; }} item The item to parse
 * @returns {{ title: string; content: any }} Returns the item as a Page
 */
async function asPage(item) {
  // 01.Introduction -> Introduction
  // 01.Welcome.md -> Welcome
  const title = item.name.split('.')[1]

  if (item.dir) {
    const filesInDirectory = await getFiles(item.path)

    return {
      title: title,
      content: await Promise.all(filesInDirectory.map((item) => asPage(item))),
    }
  }

  return {
    title: title,
    content: await readFile(item.path, { encoding: 'utf-8' }),
  }
}

const pagesDirectory = new URL('./pages', import.meta.url)

const filesInPagesDirectory = await getFiles(pagesDirectory)

export const pages = await Promise.all(
  filesInPagesDirectory.map((item) => asPage(item)),
)
