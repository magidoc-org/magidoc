/**
 * Represents a markdown document. Each document is assigned a unique ID.
 *
 * This allows to index multiple documents. When a search result is returned, it will contain this ID.
 */
export type MarkdownDocument<T> = {
  /**
   * A unique identifier for the document. This ID will be included in every search result for this markdown document.
   */
  id: string
  /**
   * Arbitrary data of your choice that will be included in every search result for this markdown document.
   */
  data: T
  /**
   * The markdown content of the document.
   */
  content: string
}
