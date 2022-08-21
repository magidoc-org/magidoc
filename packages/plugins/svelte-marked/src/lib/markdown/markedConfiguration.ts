import {
  MarkdownHeading,
  MarkdownBloquote,
  MarkdownList,
  MarkdownListItem,
  MarkdownBr,
  MarkdownCode,
  MarkdownCodeSpan,
  MarkdownTable,
  MarkdownHtml,
  MarkdownParagraph,
  MarkdownLink,
  MarkdownText,
  MarkdownDfn,
  MarkdownDel,
  MarkdownEm,
  MarkdownHr,
  MarkdownStrong,
  MarkdownImage,
  MarkdownSpace,
} from './components'

import { marked, Slugger } from 'marked'

export type MarkdownOptions = {
  /**
   * The base path to your application.
   * This is required when the application does not run in root context to generate the links properly.
   */
  baseUrl: `/${string}`

  /**
   * The slugger used to generate header IDs in marked.
   *
   * It is discouraged to set this option, because the slugger needs to be re-created when the source is changed.
   */
  slugger: Slugger
}

export function parse(src: string): marked.TokensList {
  const lexer = new marked.Lexer()
  return lexer.lex(src)
}

export type RendererType = marked.Token['type'] | string

export type Renderers = Record<RendererType, unknown>

export const defaultRenderers = (): Renderers => ({
  heading: MarkdownHeading,
  blockquote: MarkdownBloquote,
  list: MarkdownList,
  list_item: MarkdownListItem,
  br: MarkdownBr,
  code: MarkdownCode,
  codespan: MarkdownCodeSpan,
  table: MarkdownTable,
  html: MarkdownHtml,
  paragraph: MarkdownParagraph,
  link: MarkdownLink,
  text: MarkdownText,
  def: MarkdownDfn,
  del: MarkdownDel,
  em: MarkdownEm,
  hr: MarkdownHr,
  strong: MarkdownStrong,
  image: MarkdownImage,
  space: MarkdownSpace,
  escape: MarkdownSpace,
})

export const defaultOptions = (): MarkdownOptions => ({
  baseUrl: '/',
  slugger: new Slugger(),
})
