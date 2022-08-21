import type { IndexableMarkdownPart } from '../markdown/extract'

export type SearchResult<T> = {
  /**
   * Arbitrary data of your choice that will be included in every search result for this markdown document.
   */
  data: T
  /**
   * The part of markdown that was matched.
   */
  part: IndexableMarkdownPart
}
