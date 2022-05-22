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
  MarkdownTags,
  MarkdownText,
} from './components'
import { marked } from 'marked'
import type { SvelteComponentTyped } from 'svelte'
import containerExtension, {
  type NotificationToken,
} from './extensions/container'
import type { TagsToken } from './extensions/components/Tags'

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

export type RendererType = marked.Token['type'] &
  NotificationToken['type'] &
  TagsToken['type']

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
  tags: MarkdownTags,
}

export const defaultOptions: MarkdownOptions = {
  baseUrl: '/',
}
