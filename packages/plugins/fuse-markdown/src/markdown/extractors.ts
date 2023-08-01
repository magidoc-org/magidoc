import type { ExtractFunction, TextExtractor } from './extract'
import type { Token, Tokens } from 'marked'

export function defaultExtractors(): Record<Token['type'], TextExtractor> {
  return {
    blockquote: baseExtractor,
    codespan: baseExtractor,
    del: baseExtractor,
    em: baseExtractor,
    heading: baseExtractor,
    br: () => '\n',
    paragraph: baseExtractor,
    strong: baseExtractor,
    text: baseExtractor,
    link: baseExtractor,
    list: (token, extract) => {
      return (token as Tokens.List).items.reduce(
        (acc, item) => `${acc}\n${baseExtractor(item, extract)}`,
        '',
      )
    },
    list_item: baseExtractor,
    table: (token, extract) => {
      return (token as Tokens.Table).rows.reduce(
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

function baseExtractor(token: Tokens.Generic, extract: ExtractFunction) {
  if (token.tokens) {
    return extract(token.tokens as Tokens.Generic[])
  }

  if (token.type === 'text') {
    return (token as Tokens.Text).text
  }

  if (token.type === 'codespan') {
    return (token as Tokens.Codespan).text
  }

  throw new Error(`Could not extract text for ${token.type}`)
}
