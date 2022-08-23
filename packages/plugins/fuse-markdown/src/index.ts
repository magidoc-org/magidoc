export type { SearchResult } from './indexer/result'
export type { MarkdownDocument } from './indexer/document'
export type { IndexingOptions, MarkdownOptions } from './indexer/indexer'
export { extract, IndexableMarkdownType } from './markdown/extract'
export type {
  MarkdownHeader,
  ExtractFunction,
  TextExtractor,
  TextExtractors,
} from './markdown/extract'
export {
  index,
  defaultFuseOptions,
  mergeMarkdownOptions,
} from './indexer/indexer'
