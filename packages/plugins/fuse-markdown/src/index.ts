export type { MarkdownDocument } from './indexer/document'
export type { IndexingOptions, MarkdownOptions } from './indexer/indexer'
export {
  defaultFuseOptions,
  index,
  mergeMarkdownOptions,
} from './indexer/indexer'
export type { SearchResult } from './indexer/result'
export type {
  ExtractFunction,
  MarkdownHeader,
  TextExtractor,
  TextExtractors,
} from './markdown/extract'
export { extract, IndexableMarkdownType } from './markdown/extract'
