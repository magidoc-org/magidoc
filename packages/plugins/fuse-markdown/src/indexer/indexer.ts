import Fuse from 'fuse.js'
import type { Lexer, Slugger } from 'marked'
import { extract, TextExtractors } from '../markdown/extract'
import { defaultExtractors } from '../markdown/extractors'
import { defaultLexer, defaultSlugger } from '../markdown/marked'
import type { MarkdownDocument } from './document'
import type { SearchResult } from './result'

export function defaultFuseOptions<T>(): Fuse.IFuseOptions<T> {
  return {
    keys: [
      {
        name: 'part.title',
        weight: 2,
      },
      {
        name: 'part.content',
        weight: 1,
      },
    ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 2,
  }
}

export type IndexingOptions<T> = {
  /**
   * The fuse index to which the indexed markdown document parts will be added.
   *
   * You can use the `defaultFuseOptions` function to get a default options object.
   */
  fuse?: Fuse<SearchResult<T>>
  /**
   * The markdown options that are used to extract the markdown parts.
   */
  markdown?: Partial<MarkdownOptions>
}

export type MarkdownOptions = {
  /**
   * Extractors that are used to extract text from the markdown parts.
   *
   * You can use this to override the default extractors, or to add custom ones when using marked extensions.
   */
  extractors: TextExtractors
  /**
   * The slugger that is used to generate unique IDs for headers.
   */
  sluggerFactory: () => Slugger
  /**
   * The lexer that is used to tokenize the markdown source.
   */
  lexerFactory: () => Lexer
}

export function index<T>(
  documents: MarkdownDocument<T>[],
  options?: IndexingOptions<T>,
): Fuse<SearchResult<T>> {
  const fuse =
    options?.fuse ?? new Fuse<SearchResult<T>>([], defaultFuseOptions())

  documents.forEach((document) => {
    indexDocument(document, fuse, options?.markdown)
  })

  return fuse
}

function indexDocument<T>(
  document: MarkdownDocument<T>,
  fuse: Fuse<SearchResult<T>>,
  options?: Partial<MarkdownOptions>,
) {
  const sluggerFactory = options?.sluggerFactory ?? defaultSlugger
  const lexerFactory = options?.lexerFactory ?? defaultLexer

  const parts = extract(document.content, {
    slugger: sluggerFactory(),
    lexer: lexerFactory(),
    extractors: {
      ...defaultExtractors(),
      ...options?.extractors,
    },
  })

  parts.forEach((part) => {
    fuse.add({
      data: document.data,
      part: part,
    })
  })
}
