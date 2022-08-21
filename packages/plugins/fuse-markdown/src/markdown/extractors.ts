import type { ExtractFunction, TextExtractor } from './extract'
import type { marked } from 'marked'

export function defaultExtractors(): Record<
  marked.Token['type'],
  TextExtractor
> {
  return {
    blockquote: baseExtractor,
    codespan: (token) => (token as marked.Tokens.Codespan).text,
    del: baseExtractor,
    em: baseExtractor,
    heading: baseExtractor,
    br: () => '\n',
    paragraph: baseExtractor,
    strong: baseExtractor,
    text: (token) => (token as marked.Tokens.Text).text,
    link: baseExtractor,
    list: (token, extract) => {
      return (token as marked.Tokens.List).items.reduce(
        (acc, item) => `${acc}\n${baseExtractor(item, extract)}`,
        '',
      )
    },
    list_item: baseExtractor,
    table: (token, extract) => {
      return (token as marked.Tokens.Table).rows.reduce(
        (acc, row) =>
          `${acc}\n${row
            .map((cell) =>
              baseExtractor(
                {
                  ...cell,
                  type: 'table_cell',
                  raw: '',
                },
                extract,
              ),
            )
            .join(' ')}`,
        '',
      )
    },
    // These return no text because there is no value in extracting them.
    code: () => '',
    image: () => '',
    hr: () => '',
    def: () => '',
    html: () => '',
    space: () => ' ',
    escape: () => '',
  }
}

function baseExtractor(token: marked.Tokens.Generic, extract: ExtractFunction) {
  if (token.tokens) {
    return extract(token.tokens)
  }

  throw new Error(`Could not extract text for ${token.type}`)
}
