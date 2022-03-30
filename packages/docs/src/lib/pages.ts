import { derived, writable } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { capitalize } from './utils/strings'
import { text } from 'svelte/internal'

export type AppThemeValue = 'g10' | 'g90'

export const themeValue: Writable<AppThemeValue> = writable('g10')

export const PAGES_FOLDER = 'sections'

export type Page = {
  name: string
  ordinal: number
  type: 'page'
  fetchRef: string
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
  tree: ReadonlyArray<Page | TreeSection>
  values: ReadonlyArray<Page>
}

const pagesValue: Writable<Pages> = writable({
  tree: [],
  values: [],
})

function sort(tree: (Page | TreeSection)[]) {
  tree.sort((a, b) => a.ordinal - b.ordinal)
  tree
    .filter((x): x is TreeSection => x.type === 'tree')
    .forEach((tree) => sort(tree.children))
}

function createPageList(
  tree: (Page | TreeSection)[],
  result: Page[] = [],
): Page[] {
  tree.forEach((item) => {
    if (item.type === 'page') {
      result.push(item)
    } else {
      createPageList(item.children, result)
    }
  })

  return result
}

export const pages = derived(pagesValue, (value: Pages) => {
  return {
    tree: value.tree,
    values: value.values,
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
            `Error - overriding an existing page ${result.path} with tree section ${name}`,
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

        console.log(groups)
        const fullPage: Page = {
          name: parsedPage.name,
          ordinal: parsedPage.ordinal,
          fetchRef: `/${PAGES_FOLDER}/${groups.join('/')}`,
          href: `/${groups
            .map((group) =>
              group
                .replace(/^[\d]+\./, '')
                .replace(/\.markdown$/, '')
                .toLocaleLowerCase(),
            )
            .join('/')}`,
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

      sort(tree)

      pagesValue.set({
        tree: tree,
        values: createPageList(tree),
      })
    },
  }
})

export type CurrentPage = {
  value: Page
  number: number
  hasNext: boolean
  hasPrevious: boolean
  fetchContent: () => Promise<PageContent>
  set: (href: string) => void
}

export type PageContent = {
  content: string | undefined
  status: number
}

const currentPageIndex: Writable<number> = writable(0)
export const currentPage: Readable<CurrentPage | undefined> = derived(
  [currentPageIndex, pagesValue],
  ([pageIndex, pages]: [number, Pages]) => {
    const page =
      pages.values[Math.max(0, Math.min(pages.values.length, pageIndex))]

    if (!page) {
      return undefined
    }

    const hasNext = pageIndex >= pages.values.length - 1
    const hasPrevious = pageIndex > 0

    return {
      value: page,
      number: pageIndex + 1,
      hasPrevious: hasPrevious,
      hasNext: hasNext,
      fetchContent: async (): Promise<PageContent> => {
        const response = await fetch(page.fetchRef)
        if (response.status >= 300) {
          return {
            status: response.status,
            content: undefined,
          }
        }

        return {
          status: response.status,
          content: await response.text(),
        }
      },
      next: () => {
        if (hasNext) currentPageIndex.set(pageIndex + 1)
      },
      previous: () => {
        if (hasPrevious) currentPageIndex.set(pageIndex - 1)
      },
      set: (href: string) => {
        const index = pages.values.findIndex((page) => page.href === href)
        console.log('index', index)
        if (index !== -1) currentPageIndex.set(index)
      },
    }
  },
)
