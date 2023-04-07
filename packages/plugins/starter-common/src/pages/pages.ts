import { NavigationPage, Page, PageTree } from './tree'
import {
  templates,
  type Page as VariablePage,
} from '@magidoc/plugin-starter-variables'
import { getOrDefault } from './variables'
import { Slugger } from 'marked'
import { MagidocGQLSchema, MagidocGraphQLField } from '../schema/graphql'

export type PagesModel = {
  readonly home: Page
  readonly pages: ReadonlyArray<PageTree>
}

export type BuildPagesParams = {
  basePath: string
  schema: MagidocGQLSchema | null
}

export function buildPages(params: BuildPagesParams): PagesModel {
  const pages = parsePages(params).concat(createSchemaTree(params))
  setPreviousAndNextPages(pages)

  return {
    home: getHomePage(pages),
    pages,
  }
}

function parsePages({ basePath }: BuildPagesParams): ReadonlyArray<PageTree> {
  const pages = getOrDefault(templates.PAGES, getDefaultPages())

  return pages
    .filter((page): page is VariablePage => !!page)
    .map((item) => asCustomContent([basePath], item))
}

function getHomePage(pages: ReadonlyArray<PageTree>): Page {
  const page = findFirstPage(pages)
  if (!page) {
    throw new Error(
      'No custom pages or query available to use as the root application URL. You need to provide at least one custom page or your schema should contain at least one query/mutation/subscription.',
    )
  }

  return page
}

function setPreviousAndNextPages(pages: ReadonlyArray<PageTree>) {
  function iteratePages(
    pages: ReadonlyArray<PageTree>,
    handler: (page: Page) => void,
  ) {
    for (const page of pages) {
      if (page.type === 'page') {
        handler(page)
        continue
      }

      if (page.type === 'menu') {
        iteratePages(page.children, handler)
      }
    }
  }

  let previous: Page | undefined = undefined

  iteratePages(pages, (current) => {
    const buildNavigationPage = (page: Page): NavigationPage => ({
      title: page.title,
      section: page.section,
      href: page.href,
    })

    if (previous) {
      previous.next = buildNavigationPage(current)
      current.previous = buildNavigationPage(previous)
    }

    previous = current
  })
}

function findFirstPage(pages: ReadonlyArray<PageTree>): Page | null {
  return firstPageBy(pages, () => true)
}

export function findPageByHref(
  pages: ReadonlyArray<PageTree>,
  href: string,
): Page | null {
  return firstPageBy(
    pages,
    (page) => page.href.toLocaleLowerCase() === href.toLocaleLowerCase(),
  )
}

function firstPageBy(
  pages: ReadonlyArray<PageTree>,
  matcher: (page: Page) => boolean,
): Page | null {
  function iteratePages(pages: ReadonlyArray<PageTree>): Page | null {
    for (const page of pages) {
      if (page.type === 'page' && matcher(page)) {
        return page
      }

      if (page.type === 'menu') {
        const result = iteratePages(page.children)
        if (result) return result
      }
    }

    return null
  }

  return iteratePages(pages)
}

function asCustomContent(path: string[], page: VariablePage): PageTree {
  if (typeof page.content === 'string') {
    return {
      type: 'page',
      title: page.title,
      content: page.content,
      href: joinUrlPaths(...path, generatePathSegment(page.title)),
    }
  }

  const newPath = path.concat([generatePathSegment(page.title)])
  return {
    type: 'menu',
    title: page.title,
    children: page.content.map((child) => ({
      ...asCustomContent(newPath, child),
      section: page.title,
    })),
  }
}

function createSchemaTree(params: BuildPagesParams): ReadonlyArray<PageTree> {
  const { basePath, schema } = params
  if (!schema) {
    return []
  }
  return [
    createSchemaTreeSection('Queries', basePath, schema.queries.list),
    createSchemaTreeSection('Mutations', basePath, schema.mutations.list),
    createSchemaTreeSection(
      'Subscriptions',
      basePath,
      schema.subscriptions.list,
    ),
    createDirectiveTreeSection(basePath, schema),
    createTypesTreeSection(basePath, schema),
  ].filter((content): content is PageTree => !!content)
}

function createSchemaTreeSection(
  title: string,
  basePath: string,
  fields: ReadonlyArray<MagidocGraphQLField>,
): PageTree | null {
  if (fields.length === 0) {
    return null
  }

  return {
    type: 'menu',
    title: title,
    children: fields.map((field) => ({
      type: 'page',
      title: field.name,
      section: title,
      deprecated: !!field.deprecationReason,
      href: joinUrlPaths(
        basePath,
        generatePathSegment(title.toLocaleLowerCase()),
        field.name,
      ),
    })),
  }
}

function createTypesTreeSection(
  basePath: string,
  schema: MagidocGQLSchema,
): PageTree | null {
  const types = schema.types.list
  if (types.length === 0) {
    return null
  }

  return {
    type: 'menu',
    title: 'Types',
    children: types.map((type) => ({
      type: 'page',
      title: type.name,
      section: 'Types',
      href: joinUrlPaths(basePath, 'types', type.name),
    })),
  }
}

function createDirectiveTreeSection(
  basePath: string,
  schema: MagidocGQLSchema,
): PageTree | null {
  const directives = schema.directives.list
  if (directives.length === 0) {
    return null
  }

  return {
    type: 'menu',
    title: 'Directives',
    children: directives.map((directive) => ({
      type: 'page',
      title: directive.name,
      href: joinUrlPaths(basePath, 'directives', directive.name),
      section: 'Directives',
    })),
  }
}

function getDefaultPages(): VariablePage[] {
  return [
    {
      title: 'Introduction',
      content: [
        {
          title: 'Welcome',
          content: `
          # Welcome 🎉
  
          [Congratulations!](https://www.youtube.com/watch?v=1Bix44C1EzY) You have successfully created your first Magidoc website.
  
          Now that you are up and running, you can customize this website even further by providing some configuration inside your [magidoc.mjs ⚙️](https://magidoc.js.org/cli/magidoc-configuration). 
          If you wish to remove or modify this page, have a look at the *customPages* configuration.
          `
            .split('\n')
            .map((line) => line.trim())
            .join('\n'),
        },
      ],
    },
  ]
}

function joinUrlPaths(...paths: string[]): string {
  return (
    '/' +
    paths
      .flatMap((path) => path.split('/'))
      .filter((path) => !!path)
      .join('/')
  )
}

function generatePathSegment(name: string) {
  return new Slugger().slug(name).replace(/--+/g, '-') // Replaces -- with -
}
