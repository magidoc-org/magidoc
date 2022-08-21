import type Fuse from 'fuse.js'
import type { Lexer, Slugger } from 'marked'
import { extract, TextExtractors } from '../markdown/extract'
import { defaultExtractors } from '../markdown/extractors'
import { defaultLexer, defaultSlugger } from '../markdown/marked'
import type { MarkdownDocument } from './document'
import type { SearchResult } from './result'

export type IndexingOptions<T> = {
  /**
   * The fuse index to which the indexed markdown document parts will be added.
   */
  fuse: Fuse.FuseIndex<SearchResult<T>>
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
  options: IndexingOptions<T>,
) {
  documents.forEach((document) => {
    indexDocument(document, options)
  })
}

function indexDocument<T>(
  document: MarkdownDocument<T>,
  options: IndexingOptions<T>,
) {
  const sluggerFactory = options.markdown?.sluggerFactory ?? defaultSlugger
  const lexerFactory = options.markdown?.lexerFactory ?? defaultLexer

  const fuse = options.fuse
  const parts = extract(document.content, {
    slugger: sluggerFactory(),
    lexer: lexerFactory(),
    extractors: {
      ...defaultExtractors(),
      ...options.markdown?.extractors,
    },
  })

  parts.forEach((part) => {
    fuse.add({
      id: document.id,
      data: document.data,
      type: 'markdown',
      part: part,
    })
  })
}
