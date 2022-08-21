import type { marked } from 'marked'

/**
 * A markdown header
 */
export type MarkdownHeader = {
  id: string
  depth: number
  text: string
}

export enum IndexableMarkdownType {
  SECTION = 'section',
  HEADER = 'header',
}

/**
 * A section of text that is indexed. This is everything that is found under a title or that has no title at all.
 */
export type IndexableMarkdownSection = {
  type: IndexableMarkdownType.SECTION

  /***
   * The header list leading to this markdown section. They will be in order of depth.
   */
  headers: MarkdownHeader[]
  /**
   * The content used for the full text search in this section.
   */
  content: string
}

/**
 * A markdown header that is indexed. Headers receive a higher scoring than sections.
 */
export type IndexableMarkdownHeader = {
  type: IndexableMarkdownType.HEADER
  /**
   * The path that leads to this header.
   */
  path: MarkdownHeader[]
  /**
   * The title of this header.
   */
  title: string
}

export type IndexableMarkdownPart =
  | IndexableMarkdownSection
  | IndexableMarkdownHeader

export type TextExtractor = (
  token: marked.Tokens.Generic,
  extract: ExtractFunction,
) => string

export type ExtractFunction = (tokens: marked.Tokens.Generic[]) => string

export type TextExtractors = Record<
  marked.Token['type'] | string,
  TextExtractor
>

export type Options = {
  slugger: marked.Slugger
  lexer: marked.Lexer
  extractors: TextExtractors
}

export function extract(
  source: string,
  options: Options,
): IndexableMarkdownPart[] {
  return extractTokens(options.lexer.lex(source), options)
}

export function extractTokens(
  tokens: marked.TokensList,
  options: Options,
): IndexableMarkdownPart[] {
  const extract = extractFunction(options.extractors)
  const parts: IndexableMarkdownPart[] = []
  let currentSection: IndexableMarkdownSection = {
    type: IndexableMarkdownType.SECTION,
    content: '',
    headers: [],
  }

  tokens.forEach((token) => {
    if (token.type === 'heading') {
      const id = options.slugger.slug(token.text)
      const header: MarkdownHeader = {
        id: id,
        depth: token.depth,
        text: token.text,
      }
      const newCurrentSection: IndexableMarkdownSection = {
        type: IndexableMarkdownType.SECTION,
        content: '',
        headers: [],
      }

      const lastHeader =
        currentSection.headers[currentSection.headers.length - 1]

      if (lastHeader) {
        if (token.depth > lastHeader.depth) {
          newCurrentSection.headers = [...currentSection.headers, header]
        } else if (token.depth <= lastHeader.depth) {
          newCurrentSection.headers = [
            ...currentSection.headers.filter(
              (header) => header.depth < token.depth,
            ),
            header,
          ]
        }
      } else {
        newCurrentSection.headers.push(header)
      }

      if (currentSection.content.trim().length > 0) {
        parts.push(currentSection)
      }

      parts.push({
        type: IndexableMarkdownType.HEADER,
        path: newCurrentSection.headers,
        title: token.text,
      })

      currentSection = newCurrentSection
    } else {
      currentSection.content += extract([token])
    }
  })

  if (currentSection.content.trim().length > 0) {
    parts.push(currentSection)
  }

  return parts
}

export function extractFunction(extractors: TextExtractors): ExtractFunction {
  return (tokens) => {
    return tokens.reduce((acc, token) => {
      const extractor = extractors[token.type]
      if (!extractor) {
        throw new Error(`No extractor found for token type: ${token.type}`)
      }

      return acc + extractor(token, extractFunction(extractors))
    }, '')
  }
}
