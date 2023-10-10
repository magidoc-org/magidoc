import {
  templates,
  type Page as VariablePage,
} from '@magidoc/plugin-starter-variables'
import { base } from '$app/paths'
import { createModelContent } from './model'
import { getOrDefault } from './variables'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import Slugger from 'github-slugger'
import type { PageTree, Page } from '@magidoc/plugin-starter-common'

export const appTitle = getOrDefault(
  templates.APP_TITLE,
  'GraphQL Documentation',
)

const buildPages = parseCustomPages().concat(createModelContent())
setPreviousAndNextPages(buildPages)
export const pages: ReadonlyArray<PageTree> = Object.freeze(buildPages)

export const homePageUrl = getHomePageUrl()

function parseCustomPages(): ReadonlyArray<PageTree> {
  const pages = getOrDefault(templates.PAGES, getDefaultPages())

  return pages
    .filter((page): page is VariablePage => !!page)
    .map((item) => asCustomContent([], item))
}

function getHomePageUrl(): string {
  const page = findFirstPage()
  if (page) return page.href

  throw new Error(
    'No custom pages or query available to use as the root application URL. You need to provide at least one custom page or your schema should contain at least one query/mutation/subscription.',
  )
}

function setPreviousAndNextPages(pages: PageTree[]) {
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
    if (previous) {
      previous.next = {
        title: current.title,
        section: current.section,
        href: current.href,
      }

      current.previous = {
        title: previous.title,
        section: previous.section,
        href: previous.href,
      }
    }

    previous = current
  })
}

function findFirstPage(): Page | null {
  return firstPageBy(() => true)
}

export function findPageByHref(href: string): Page | null {
  return firstPageBy(
    (page) => page.href.toLocaleLowerCase() === href.toLocaleLowerCase(),
  )
}

function firstPageBy(matcher: (page: Page) => boolean): Page | null {
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
      href: urlUtils.joinUrlPaths(base, ...path, generatePath(page.title)),
    }
  }

  const newPath = path.concat([generatePath(page.title)])
  return {
    type: 'menu',
    title: page.title,
    children: page.content.map((child) => ({
      ...asCustomContent(newPath, child),
      section: page.title,
    })),
  }
}

function generatePath(value: string): string {
  return urlUtils.generatePathSegment(value, new Slugger())
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
