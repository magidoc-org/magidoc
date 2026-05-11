import Slugger from 'github-slugger'
import { Lexer, type TokensList } from 'marked'
import type { Component } from 'svelte'
import {
  MarkdownBlockquote,
  MarkdownBr,
  MarkdownCode,
  MarkdownCodeSpan,
  MarkdownDel,
  MarkdownDfn,
  MarkdownEm,
  MarkdownEscape,
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

export function parse(src: string): TokensList {
  const lexer = new Lexer()
  return lexer.lex(src)
}

export type RendererType = string

// biome-ignore lint/suspicious/noExplicitAny: renderer registry must accept any Svelte component
export type Renderers = Record<RendererType, Component<any>>

export const defaultRenderers = (): Renderers => ({
  heading: MarkdownHeading,
  blockquote: MarkdownBlockquote,
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
  escape: MarkdownEscape,
})

export const defaultOptions = (): MarkdownOptions => ({
  baseUrl: '/',
  slugger: new Slugger(),
})
