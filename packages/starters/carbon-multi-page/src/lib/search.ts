import { index, type SearchResult } from '@magidoc/fuse-markdown'
import type Fuse from 'fuse.js'
import { pages } from './pages'
import type { WebsitePage, WebsiteContent } from 'src/app'
import type { NotificationToken } from './components/markdown/containers/notification/Notification'
import type { TabsToken } from './components/markdown/containers/tabs/Tabs'
import { setupMarkedExtensions } from './markdown'

export type MarkdownData = {
  type: 'markdown'
  url: string
  section?: string
}

export type ResultRange = [number, number]

export type MagidocSearchResult = {
  result: SearchResult<MarkdownData>
  indexes: ReadonlyArray<ResultRange>
}

setupMarkedExtensions()

const pagesSearch: Fuse<SearchResult<MarkdownData>> = index(
  flatPages(pages).map((page) => ({
    data: {
      type: 'markdown',
      url: page.href,
      section: page.section,
    },
    content: page.content,
  })),
  {
    markdown: {
      extractors: {
        tags: () => '',
        notification: (token, extract) =>
          extract((token as NotificationToken).tokens),
        tabs: (token, extract) => {
          const tabs = (token as TabsToken).tabs
          return tabs.map((tab) => extract(tab.tokens)).join('\n')
        },
      },
    },
  },
)
export function search(query: string): ReadonlyArray<MagidocSearchResult> {
  return pagesSearch.search(query).map((result) => ({
    result: result.item,
    indexes: result.matches?.flatMap((match) => match.indices) || [],
  }))
}

function flatPages(pages: ReadonlyArray<WebsiteContent>): WebsitePage[] {
  return pages.flatMap((page) => {
    if (page.type === 'page') {
      return [page]
    }

    if (page.type === 'menu') {
      return flatPages(page.children)
    }

    return []
  })
}
