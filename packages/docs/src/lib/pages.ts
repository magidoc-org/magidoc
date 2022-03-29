import { derived, writable } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { capitalize } from './utils/strings'

export type AppThemeValue = 'g10' | 'g90'

export const themeValue: Writable<AppThemeValue> = writable('g10')

export const PAGES_FOLDER = 'sections'

export type Page = {
  name: string
  ordinal: number
  type: 'page'
  href: string
  path: string
}

export type TreeSection = {
  name: string
  ordinal: number
  type: 'tree'
  children: (Page | TreeSection)[]
}

export type Pages = {
  tree: (Page | TreeSection)[]
}

const pagesValue: Writable<Pages> = writable({
  tree: [],
})

export const pages = derived(pagesValue, (value: Pages) => {
  return {
    tree: value.tree,
    setPagesPaths(paths: string[]) {
      const tree: (Page | TreeSection)[] = []

      function findOrCreateSection(
        name: string,
        ordinal: number,
        children: (Page | TreeSection)[],
      ): TreeSection {
        const result = children.find((item) => item.name === name)
        if (result && result.type === 'tree') return result
        if (result) {
          console.error(
            `Error - overriding an existing page ${result.path} with tree section ${item.name}`,
          )
        }

        const newSection: TreeSection = {
          name: name,
          ordinal: ordinal,
          type: 'tree',
          children: [],
        }
        children.push(newSection)
        return newSection
      }

      function parseName(name: string): { ordinal: number; name: string } {
        const parts = name.split('.')

        return {
          ordinal: Number.parseInt(parts[0]),
          name: parts[1]
            .split('-')
            .map((part) => capitalize(part))
            .join(' '),
        }
      }

      paths.forEach((path) => {
        const pathRegex = new RegExp(
          `^(?:..\/)*(?:static\/)(?:${PAGES_FOLDER}\/)(?:([0-9]+.[a-zA-Z0-9-]+)\/)*([0-9]+\.[a-zA-Z0-9-]+\.markdown)$`,
          'g',
        )

        const match = pathRegex.exec(path)
        if (!match) {
          console.error(
            `path: '${path}' for regex '${pathRegex}'... page will be omitted`,
          )
          return null
        }

        const groups = match.slice(1)
        const sections = groups
          .slice(0, groups.length - 1)
          .map((section) => parseName(section))

        const page = groups[groups.length - 1]
        const parsedPage = parseName(page)

        const fullPage: Page = {
          name: parsedPage.name,
          ordinal: parsedPage.ordinal,
          href: `/${PAGES_FOLDER}$/${groups.join('/')}`,
          path: path,
          type: 'page',
        }

        if (sections.length === 0) {
          tree.push(fullPage)
          return
        }

        var current: TreeSection | undefined
        sections.forEach((section) => {
          const children = current ? current.children : tree
          current = findOrCreateSection(section.name, section.ordinal, children)
        })
        current?.children.push(fullPage)
      })

      console.log(tree)
      pagesValue.set({
        tree: tree,
      })
    },
  }
})

export type CurrentPage = {
  value: Page
  hasNext: Boolean
  hasPrevious: Boolean
}

// const currentPageIndex: Writable<number> = writable(0)
// export const currentPage: Readable<CurrentPage> = derived(
//   [currentPageIndex, pagesValue],
//   ([pageNumber, pages]: [number, ReadonlyArray<Page>]) => {
//     const page = pages[Math.max(0, Math.min(pages.length, pageNumber))]
//     const hasNext = pageNumber >= pages.length - 1
//     const hasPrevious = pageNumber > 0

//     return {
//       value: page,
//       hasPrevious: hasPrevious,
//       hasNext: hasNext,
//       next: () => {
//         if (hasNext) currentPageIndex.set(pageNumber + 1)
//       },
//       previous: () => {
//         if (hasPrevious) currentPageIndex.set(pageNumber - 1)
//       },
//     }
//   },
// )
