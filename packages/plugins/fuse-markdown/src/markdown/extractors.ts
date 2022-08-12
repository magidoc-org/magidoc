import type { TextExtractor, TextExtractors } from './extract'
import type { marked } from 'marked'

export function defaultExtractors(): Record<
  marked.Token['type'],
  TextExtractor
> {
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
    escape: baseExtractor,
    link: baseExtractor,
    list: (token, extractors) =>
      (token as marked.Tokens.List).items.reduce(
        (acc, item) => `${acc} ${baseExtractor(item, extractors)}`,
        '',
      ),
    list_item: baseExtractor,
    table: (token, extractors) =>
      (token as marked.Tokens.Table).rows.reduce(
        (acc, row) =>
          `${acc} ${row.reduce(
            (acc, cell) =>
              `${acc} ${baseExtractor(
                {
                  ...cell,
                  type: 'table_cell',
                  raw: '',
                },
                extractors,
              )}`,
            '',
          )}`,
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

function baseExtractor(
  token: marked.Tokens.Generic,
  extractors: TextExtractors,
) {
  if (token.type === 'text') {
    return (token as marked.Tokens.Text).text
  }

  if (token.tokens) {
    return token.tokens.reduce((acc, token) => {
      const extractor = extractors[token.type]
      if (!extractor) {
        throw new Error(`No extractor for token type ${token.type}`)
      }
      return `${acc}${extractor(token, extractors)}`
    }, '')
  }

  throw new Error(`Could not extract text for ${token.type}`)
}
