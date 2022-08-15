import type Fuse from 'fuse.js'
import type { Options as MarkdownOptions } from '../markdown/extract'
import type { MarkdownDocument } from './document'
import type { SearchResult } from './result'

export type IndexingOptions<T> = {
  fuse: Fuse.FuseIndex<SearchResult<T>>
  markdown?: Partial<MarkdownOptions>
}

export function index<T>(
  documents: MarkdownDocument<T>[],
  options: IndexingOptions<T>,
) {
  
}
