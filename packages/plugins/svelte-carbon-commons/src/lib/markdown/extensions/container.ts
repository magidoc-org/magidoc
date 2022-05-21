import { marked } from 'marked'

const notificationStyles = ['error', 'success', 'info', 'warning'] as const
export type NotificationStyle = typeof notificationStyles[number]

export type NotificationToken = marked.Tokens.Generic & {
  type: 'notification'
  style: NotificationStyle
  raw: string
  tokens: marked.Token[]
}

type ContainerOptions = Record<string, boolean | string>

export default function (): marked.TokenizerExtension {
  return {
    name: 'container',
    level: 'block',
    start(src: string) {
      return src.match(/:::[^:\n]/)?.index
    },
    tokenizer(src: string): marked.Tokens.Generic {
      const rule =
        /^^:::(?<type>notification)(?<options>.*)?\n(?<content>(.|\n)*)\n:::(?:\n|$)/i

      console.log('YES')
      const match = rule.exec(src)
      if (!match || match.groups) return null

      const type = match.groups.type.toLocaleLowerCase()
      const options = parseOptions(match.groups.options || '')
      const content = match.groups.content || ''

      let result: marked.Tokens.Generic | null

      switch (type) {
        case 'notification':
          result = parseNotification(match[0], options)
          break
        default:
          result = null
          break
      }

      if (!result) {
        return null
      }

      if (result.tokens) {
        this.lexer.inline(content, result.tokens)
      }

      return result
    },
  }
}

function parseNotification(
  raw: string,
  options: ContainerOptions,
): NotificationToken {
  const typeOption = options['type']?.toString()?.toLocaleLowerCase()
  const style: NotificationStyle = notificationStyles.some(
    (it) => it === typeOption,
  )
    ? (typeOption as NotificationStyle)
    : 'info'

  return {
    type: 'notification',
    raw: raw,
    style: style,
    tokens: [],
  }
}

function parseOptions(options: string): ContainerOptions {
  const matches = /(?<name>[a-z0-9]+)(?:="(?<value>(.*?)(?<!\\))")?/gi
  const output = {}
  console.log(matches.exec(options))
  return output
}
