import { index, type SearchResult } from '@magidoc/fuse-markdown'
import type Fuse from 'fuse.js'
import { pages } from './pages'
import type { WebsitePage, WebsiteContent } from 'src/app'
import type { NotificationToken } from './components/markdown/containers/notification/Notification'
import type { TabsToken } from './components/markdown/containers/tabs/Tabs'
import { setupMarkedExtensions } from './markdown'

setupMarkedExtensions()

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

const pagesSearch: Fuse<SearchResult<MarkdownData>> = index(
  flatPages(pages)
    .map((page) => ({
      data: {
        type: 'markdown' as const,
        url: page.href,
        section: page.section,
      },
      content: page.content || '',
    }))
    .filter((page) => !!page.content.trim()),
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
    indexes: collapseIndexes(
      result.matches?.flatMap((match) => match.indices) || [],
    ),
  }))
}

function collapseIndexes(
  indexes: ReadonlyArray<ResultRange>,
): ReadonlyArray<ResultRange> {
  const result: ResultRange[] = []
  let current: ResultRange = [0, 0]
  const openings = new Set(indexes.map(([start]) => start))
  const closings = new Set(indexes.map(([, end]) => end))
  const min = Math.min(...indexes.map(([start]) => start))
  const max = Math.max(...indexes.map(([, end]) => end))
  let open = false
  for (let i = min; i <= max; i++) {
    if (openings.has(i) && !open) {
      open = true
      current = [i, 0]
    } else if (closings.has(i) && open) {
      open = false
      current[1] = i
      result.push(current)
    }
  }
  return result
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
