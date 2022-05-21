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
} from '$lib'
import { marked } from 'marked'
import type { SvelteComponentTyped } from 'svelte'

export type MarkdownOptions = {
  baseUrl: string
}

export function parse(
  src: string,
  options: MarkdownOptions,
): marked.TokensList {
  marked.setOptions({
    ...options,
  })
  const lexer = new marked.Lexer(options)
  return lexer.lex(src)
}

export type RendererType = marked.Token['type']

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
}
