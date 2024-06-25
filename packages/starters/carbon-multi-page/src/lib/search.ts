import { type SearchResult as FuseGraphQLSearchResult, index as indexSchema } from '@magidoc/plugin-fuse-graphql'
import {
  type SearchResult as FuseMarkdownSearchResult,
  type MarkdownOptions,
  index as indexMarkdown,
} from '@magidoc/plugin-fuse-markdown'
import type { Page, PageTree } from '@magidoc/plugin-starter-common'
import type Fuse from 'fuse.js'
import type { NotificationToken } from './components/markdown/containers/notification/Notification'
import type { TabsToken } from './components/markdown/containers/tabs/Tabs'
import { setupMarkedExtensions } from './markdown'
import { isModelEmpty, schema } from './model'
import { pages } from './pages'

setupMarkedExtensions()

export type MarkdownData = {
  type: 'markdown'
  url: string
  section?: string
}

export type GraphQLData = {
  type: 'graphql'
}

export type ResultRange = [number, number]

export type Match = {
  value: string
  location: string
  indices: ReadonlyArray<ResultRange>
}

export type MarkdownSearchResult = {
  type: 'markdown'
  score: number
  result: FuseMarkdownSearchResult<MarkdownData>
  matches: ReadonlyArray<Match>
}

export type GraphQLSearchResult = {
  type: 'graphql'
  score: number
  result: FuseGraphQLSearchResult
  matches: ReadonlyArray<Match>
}

export type MagidocSearchResult = MarkdownSearchResult | GraphQLSearchResult

const MARKDOWN_OPTIONS: Partial<MarkdownOptions> = {
  extractors: {
    tags: () => '',
    notification: (token, extract) => extract((token as NotificationToken).tokens),
    tabs: (token, extract) => {
      const tabs = (token as TabsToken).tabs
      return tabs.map((tab) => extract(tab.tokens)).join('\n')
    },
  },
}

const pagesSearch: Fuse<FuseMarkdownSearchResult<MarkdownData>> = indexMarkdown(
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
    markdown: MARKDOWN_OPTIONS,
  },
)

const schemaSearch: Fuse<FuseGraphQLSearchResult> = indexSchema(schema, {
  markdown: MARKDOWN_OPTIONS,
})

export function search(query: string): ReadonlyArray<MagidocSearchResult> {
  const pagesResult: ReadonlyArray<MagidocSearchResult> = pagesSearch.search(query).map((result) => ({
    type: 'markdown',
    score: result.score || 0,
    result: result.item,
    matches: (result.matches || []).map((match) => ({
      value: match.value || '',
      location: match.key || '',
      indices: collapseIndexes(match.indices),
    })),
  }))

  let schemaResult: ReadonlyArray<MagidocSearchResult> = []

  if (!isModelEmpty()) {
    schemaResult = schemaSearch.search(query).map((result) => ({
      type: 'graphql',
      score: result.score || 0,
      result: result.item,
      matches: (result.matches || []).map((match) => ({
        value: match.value || '',
        location: match.key || '',
        indices: match.indices,
      })),
    }))
  }

  return mergeResults(pagesResult, schemaResult)
}

function mergeResults(
  first: ReadonlyArray<MagidocSearchResult>,
  second: ReadonlyArray<MagidocSearchResult>,
): ReadonlyArray<MagidocSearchResult> {
  // Lower the score the better
  return [...first, ...second].sort((a, b) => a.score - b.score).slice(0, 10)
}

function collapseIndexes(indexes: ReadonlyArray<ResultRange>): ReadonlyArray<ResultRange> {
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

function flatPages(pages: ReadonlyArray<PageTree>): Page[] {
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
