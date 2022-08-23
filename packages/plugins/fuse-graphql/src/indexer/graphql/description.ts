import { extract, IndexableMarkdownType } from '@magidoc/plugin-fuse-markdown'
import type { MarkdownOptions } from '@magidoc/plugin-fuse-markdown'

type AnythingWithADescription = {
  description: string | undefined | null
}

export function getDescription(
  { description }: AnythingWithADescription,
  options: MarkdownOptions,
): string | undefined {
  if (!description) return undefined
  if (description.trim().length === 0) return undefined
  return extract(description, {
    extractors: options.extractors,
    lexer: options.lexerFactory(),
    slugger: options.sluggerFactory(),
  })
    .map((value) => {
      switch (value.type) {
        case IndexableMarkdownType.SECTION:
          return value.content
        case IndexableMarkdownType.HEADER:
          return ''
      }
    })
    .join('\n')
}
