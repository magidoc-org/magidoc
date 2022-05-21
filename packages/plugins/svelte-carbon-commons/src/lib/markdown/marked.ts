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
  MarkdownNotification,
  MarkdownParagraph,
  MarkdownSpace,
  MarkdownStrong,
  MarkdownTable,
  MarkdownText,
} from '$lib'
import { marked } from 'marked'
import type { SvelteComponentTyped } from 'svelte'
import containerExtension, {
  type NotificationToken,
} from './extensions/container'

export type MarkdownOptions = {
  /**
   * The base path to your application.
   * This is required when the application does not run in root context to generate the links properly.
   */
  baseUrl: `/${string}`
}

marked.use({ extensions: [containerExtension()] })
marked.use({
  gfm: true,
  headerIds: true,
  mangle: true,
  breaks: false,
  sanitize: false,
  silent: true,
  smartLists: true,
  smartypants: false,
})

const lexer = new marked.Lexer()

export function parse(src: string): marked.TokensList {
  return lexer.lex(src)
}

export type RendererType = marked.Token['type'] & NotificationToken['type']

export type Renderers = Record<RendererType, SvelteComponentTyped>

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
  notification: MarkdownNotification,
}

export const defaultOptions: MarkdownOptions = {
  baseUrl: '/',
}
