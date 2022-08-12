export type SearchResult<T> = {
  /**
   * The unique ID of the markdown document.
   */
  id: string
  /**
   * This is an hardcoded type for markdown documents.
   * In case you can to index more than one type of thing inside the search, you can use this to know if the result is a markdown type.
   */
  type: 'markdown'
  /**
   * Arbitrary data of your choice that will be included in every search result for this markdown document.
   */
  data: T
}
