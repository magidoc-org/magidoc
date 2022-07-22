import { templates, type Page } from '@magidoc/plugin-starter-variables'
import type { WebsitePage, WebsiteContent } from 'src/app'
import { base } from '$app/paths'
import { createModelContent } from './model'
import { getOrDefault } from './variables'
import { urlUtils } from '@magidoc/plugin-svelte-marked'

export const appTitle = getOrDefault(templates.APP_TITLE, 'Magidoc')

const buildPages = parseCustomPages().concat(createModelContent())
setPreviousAndNextPages(buildPages)
export const pages: ReadonlyArray<WebsiteContent> = Object.freeze(buildPages)

export const homePageUrl = getHomePageUrl()

function parseCustomPages(): ReadonlyArray<WebsiteContent> {
  const pages = getOrDefault(templates.PAGES, getDefaultPages())

  return pages
    .filter((page): page is Page => !!page)
    .map((item) => asCustomContent([], item))
}

function getHomePageUrl(): string {
  const page = findFirstPage()
  if (page) return page.href

  throw new Error(
    'No custom pages or query available to use as the root application URL. You need to provide at least one custom page or your schema should contain at least one query/mutation/subscription.',
  )
}

function setPreviousAndNextPages(pages: WebsiteContent[]) {
  function iteratePages(
    pages: ReadonlyArray<WebsiteContent>,
    handler: (page: WebsitePage) => void,
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

  let previous: WebsitePage | undefined = undefined

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

function findFirstPage(): WebsitePage | null {
  return firstPageBy(() => true)
}

export function findPageByHref(href: string): WebsitePage | null {
  return firstPageBy(
    (page) => page.href.toLocaleLowerCase() === href.toLocaleLowerCase(),
  )
}

function firstPageBy(
  matcher: (page: WebsitePage) => boolean,
): WebsitePage | null {
  function iteratePages(
    pages: ReadonlyArray<WebsiteContent>,
  ): WebsitePage | null {
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

function asCustomContent(path: string[], page: Page): WebsiteContent {
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
  // https://github.com/markedjs/marked/blob/master/src/Slugger.js
  return (
    value
      .toLowerCase()
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/gi, '')
      // remove unwanted chars
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        '',
      )
      .replace(/\s/g, '-')
      .replace(/--+/g, '-') // Replaces -- with -
  )
}

function getDefaultPages(): Page[] {
  return [
    {
      title: 'Introduction',
      content: [
        {
          title: 'Welcome',
          content: `
        # Welcome 🎉

        [Congratulations!](https://www.youtube.com/watch?v=1Bix44C1EzY) You have successfully created your first Magidoc website.

        Now that you are up and running, you can customize this website even further by providing some configuration inside your [magidoc.mjs ⚙️](https://magidoc-org.github.io/magidoc/cli/magidoc-configuration). 
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
