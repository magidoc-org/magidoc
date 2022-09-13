import fs from 'fs'
import _ from 'lodash'
import path from 'path'

export type MarkdownPage = {
  title: string
  content: string | MarkdownPage[]
}

type NumberedMarkdownPage = MarkdownPage & {
  number: number
}

type File = {
  dir: boolean
  name: string
  path: string
}

/**
 * Loads all markdown files from the given directory and return them as a list of markdown pages that can be passed directly as a magidoc option.
 *
 * Files in the directory must follow a standard structure. All files and directory should have a number indicating their order, followed by a title and a `.md` extension for files.
 *
 * @example
 * 01.Introduction
 * ├── 01.Welcome.md
 * └── 02.Get Started.md
 * 02.Advanced Usage.md
 * 03.More Resources
 * ├── 01.Playground.md
 * └── 02.Clients.md
 *
 * @param directory The directory where the markdown file tree it located
 * @returns markdown pages to pass to the magidoc configuration
 */
export function loadMarkdownPagesTree(directory: string): MarkdownPage[] {
  const files = getFiles(directory)
  return sorted(files.map((file) => asPage(file)))
}

function getFiles(dir: string): File[] {
  return fs.readdirSync(dir).flatMap((item) => {
    const currentPath = path.join(dir, item)
    if (fs.statSync(currentPath).isDirectory()) {
      return {
        dir: true,
        name: item,
        path: currentPath,
      }
    }

    return {
      dir: false,
      name: item,
      path: currentPath,
    }
  })
}

function asPage(item: File): NumberedMarkdownPage {
  // 01.Introduction -> Introduction
  // 01.Welcome.md -> Welcome
  const parts = item.name.split('.')
  const number = parseInt(parts[0], 10)
  if (isNaN(number)) {
    throw new Error(
      `Invalid file name: ${item.name}. File and directory names must start with a number.`,
    )
  }

  if (item.dir) {
    return {
      number,
      title: parts.slice(1).join('.'),
      content: sorted(getFiles(item.path).map((item) => asPage(item))),
    }
  }

  if (parts[parts.length - 1] !== 'md') {
    throw new Error(
      `Invalid file name: ${item.name}\nFiles must follow the format: <number>.<title>.md`,
    )
  }

  return {
    number,
    title: parts.slice(1, parts.length - 1).join('.'),
    content: fs.readFileSync(item.path).toString(),
  }
}

function sorted(pages: NumberedMarkdownPage[]): MarkdownPage[] {
  return _.sortBy(pages, (page) => page.number).map((page) => ({
    title: page.title,
    content: page.content,
  }))
}
