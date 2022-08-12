import type { TextExtractor } from './extract'
import type { marked } from 'marked'

export function defaultExtractors(): Record<
  marked.Token['type'],
  TextExtractor
> {
  return {
    blockquote: (token) => (token as marked.Tokens.Blockquote).text,
    codespan: (token) => (token as marked.Tokens.Codespan).text,
    del: (token) => (token as marked.Tokens.Del).text,
    em: (token) => (token as marked.Tokens.Em).text,
    heading: (token) => (token as marked.Tokens.Heading).text,
    br: () => '\n',
    paragraph: (token) => (token as marked.Tokens.Paragraph).text,
    strong: (token) => (token as marked.Tokens.Strong).text,
    text: (token) => (token as marked.Tokens.Text).text,
    escape: (token) => (token as marked.Tokens.Escape).text,
    link: (token) => (token as marked.Tokens.Link).text,
    list: (token) =>
      (token as marked.Tokens.List).items.reduce(
        (acc, item) => `${acc} ${item.text}`,
        '',
      ),
    list_item: (token) => (token as marked.Tokens.ListItem).text,
    table: (token) =>
      (token as marked.Tokens.Table).rows.reduce(
        (acc, row) =>
          `${acc} ${row.reduce((acc, cell) => `${acc} ${cell.text}`, '')}`,
        '',
      ),
    // These return no text because there is no value in extracting them.
    code: () => '',
    image: () => '',
    hr: () => '',
    def: () => '',
    html: () => '',
    space: () => ' ',
  }
}
