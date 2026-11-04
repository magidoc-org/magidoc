import type { TokenExtractionParameters } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'

const tagColors = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
  'high-contrast',
  'outline',
] as const
export type TagColor = (typeof tagColors)[number]

export type Tag = {
  name: string
}

export type TagsToken = Tokens.Generic & {
  type: 'tags'
  tags: Tag[]
  colors: TagColor[]
  raw: string
}

export function parseTags({ options, raw, content }: TokenExtractionParameters): TagsToken {
  const colorsOption = (options.colors ?? options.color ?? 'outline').toString().toLocaleLowerCase()

  const colors = colorsOption
    .split(',')
    .map((it) => it.trim().toLocaleLowerCase())
    .filter((it): it is TagColor => tagColors.some((color) => it === color))

  return {
    type: 'tags',
    raw: raw,
    tags: content.split(',').map((tag) => ({ name: tag })),
    colors: colors.length === 0 ? ['outline'] : colors,
  }
}
