/**
 * Represents a markdown document. Each document is assigned a unique ID.
 *
 * This allows to index multiple documents. When a search result is returned, it will contain this ID.
 */
export type MarkdownDocument<T> = {
  /**
   * Arbitrary data of your choice that will be included in every search result for this markdown document.
   *
   * Use this to help you identify what content was found in the search result, like a page URL or ID, etc.
   *
   * This data will not be indexed in any way by default.
   */
  data: T
  /**
   * The markdown content of the document.
   */
  content: string
}
