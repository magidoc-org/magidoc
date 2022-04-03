import { capitalize } from './utils/strings'

export const PAGES_FOLDER = 'sections'

export type Page = {
  name: string
  ordinal: number
  type: 'page'
  href: string
  path: string
  contentFetcher: () => Promise<PageContent>
}

export type PageContent = {
  body: string
  attributes: PageContentAttributes
}

export type PageContentAttributes = {
  title: string
  tags: string[]
  deprecationReason?: string
  since?: string
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

export function createPages(
  targets: {
    path: string
    contentFetcher: () => Promise<PageContent>
  }[],
): Pages {
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

  targets.forEach(({ path, contentFetcher: contentFetcher }) => {
    const pathRegex = new RegExp(
      `^(?:..\/)*(?:lib\/)(?:${PAGES_FOLDER}\/)(?:([0-9]+.[a-zA-Z0-9-]+)\/)*([0-9]+\.[a-zA-Z0-9-]+\.md)$`,
      'g',
    )

    const match = pathRegex.test(path)
    if (!match) {
      console.error(
        `path: '${path}' for regex '${pathRegex.source}'... page will be omitted`,
      )
      return null
    }

    const rawGroups = path
      .substring(path.indexOf(`${PAGES_FOLDER}/`) + PAGES_FOLDER.length + 1)
      .split('/')

    const parsedGroups = rawGroups.map((section) => parseName(section))    
    const sections = parsedGroups.slice(0, parsedGroups.length - 1)
    const page = parsedGroups[parsedGroups.length - 1]

    const fullPage: Page = {
      name: page.name,
      ordinal: page.ordinal,
      href: `/${rawGroups
        .map((group) =>
          group
            .replace(/^[\d]+\./, '')
            .replace(/\.md$/, '')
            .toLocaleLowerCase(),
        )
        .join('/')}`,
      path: path,
      type: 'page',
      contentFetcher: contentFetcher,
    }

    if (sections.length === 0) {
      tree.push(fullPage)
      return
    }

    let current: TreeSection | undefined
    sections.forEach((section) => {
      const children = current ? current.children : tree
      current = findOrCreateSection(section.name, section.ordinal, children)
    })
    current?.children.push(fullPage)
  })

  sort(tree)

  return {
    tree: tree,
    values: createPageList(tree),
  }
}

export type CurrentPage = {
  value: Page
  number: number
  previous?: Page
  next?: Page
}

export function getCurrentPage(href: string, pages: Pages): CurrentPage | null {
  const pageIndex = pages.values.findIndex(
    (page) => page.href.toLocaleLowerCase() === href.toLocaleLowerCase(),
  )
  if (pageIndex < 0) {
    return null
  }

  const next = pages.values[pageIndex + 1]
  const previous = pages.values[pageIndex - 1]

  return {
    value: pages.values[pageIndex],
    number: pageIndex + 1,
    previous: previous,
    next: next,
  }
}
