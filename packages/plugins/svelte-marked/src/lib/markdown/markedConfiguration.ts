import {
  MarkdownBloquote,
  MarkdownBr,
  MarkdownCode,
  MarkdownCodeSpan,
  MarkdownDel,
  MarkdownDfn,
  MarkdownEm,
  MarkdownHeading,
  MarkdownHr,
  MarkdownHtml,
  MarkdownImage,
  MarkdownLink,
  MarkdownList,
  MarkdownListItem,
  MarkdownParagraph,
  MarkdownSpace,
  MarkdownStrong,
  MarkdownTable,
  MarkdownText,
} from './components'
import { marked } from 'marked'
import type { SvelteComponentTyped } from 'svelte'

export type MarkdownOptions = {
  /**
   * The base path to your application.
   * This is required when the application does not run in root context to generate the links properly.
   */
  baseUrl: `/${string}`
}

marked.use({
  gfm: true,
  headerIds: true,
  mangle: false,
  breaks: false,
  sanitize: false,
  silent: false,
  smartLists: true,
  smartypants: false,
})

export function parse(src: string): marked.TokensList {
  const lexer = new marked.Lexer()
  return lexer.lex(src)
}

export type RendererType = marked.Token['type']

export type Renderers = Record<RendererType & string, SvelteComponentTyped>

export const defaultRenderers: Renderers = {
  blockquote: MarkdownBloquote,
  list: MarkdownList,
  list_item: MarkdownListItem,
  br: MarkdownBr,
  code: MarkdownCode,
  codespan: MarkdownCodeSpan,
  table: MarkdownTable,
  heading: MarkdownHeading,
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
}

export const defaultOptions: MarkdownOptions = {
  baseUrl: '/',
}

export const contextKey = 'MARKED_CONTEXT_KEY'
