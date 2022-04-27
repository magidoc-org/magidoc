import type { Page } from '@magidoc/plugin-starter-variables'
import type { CustomContent, CustomPage } from 'src/app'

export function formatPages(pages: (Page | undefined)[]): CustomContent[] {
  return pages
    .filter((page): page is Page => !!page)
    .map((item) => asCustomContent([], item))
}

export function findFirstPage(pages: CustomContent[]): CustomPage | null {
  return firstPageBy(pages, () => true)
}

export function findPageByHref(
  pages: CustomContent[],
  href: string,
): CustomPage | null {
  return firstPageBy(pages, (page) => page.href === href)
}

function firstPageBy(
  pages: CustomContent[],
  matcher: (page: CustomPage) => boolean,
): CustomPage | null {
  for (const page of pages) {
    if (page.type === 'page' && matcher(page)) {
      return page
    }

    if (page.type === 'menu') {
      const result = firstPageBy(page.children, matcher)
      if (result) return result
    }
  }

  return null
}

function asCustomContent(path: string[], page: Page): CustomContent {
  if (typeof page.content === 'string') {
    const base = path.length === 0 ? '' : '/' + path.join('/')
    return {
      type: 'page',
      title: page.title,
      content: page.content,
      href: base + '/' + generatePath(page.title),
    }
  }

  const newPath = path.concat([generatePath(page.title)])
  return {
    type: 'menu',
    title: page.title,
    children: page.content.map((child) => asCustomContent(newPath, child)),
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
  )
}
