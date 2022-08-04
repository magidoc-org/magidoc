import type { marked } from 'marked'
import type { TokenExtractionParameters } from '@magidoc/plugin-svelte-marked'

export type MarkdownTab = {
  title: string
  raw: string
  tokens: marked.Token[]
}

export type TabsToken = marked.Tokens.Generic & {
  type: 'tabs'
  tabs: MarkdownTab[]
  raw: string
}

export function parseTabs({
  lexer,
  content,
  raw,
}: TokenExtractionParameters): TabsToken | null {
  const lines: string[] = content.split('\n')
  const splitIndexes = lines
    .map((line, index) => (line.startsWith('---') ? index : -1))
    .filter((it) => it !== -1)

  // No tab name, then nothing is rendered
  if (splitIndexes.length === 0) {
    return null
  }

  const tabs: MarkdownTab[] = splitIndexes.map((start, index) => {
    const title: string = lines[start].replace('---', '').trim()
    const content: string = lines
      .slice(start + 1, splitIndexes[index + 1] ?? lines.length)
      .join('\n')
    const tokens: marked.Token[] = []
    lexer.blockTokens(content, tokens)
    return { title, raw: content, tokens }
  })
  return {
    type: 'tabs',
    raw: raw,
    tabs: tabs,
  }
}
