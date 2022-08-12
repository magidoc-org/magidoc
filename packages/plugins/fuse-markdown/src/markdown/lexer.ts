import { marked } from 'marked'

export function getLexer() {
  return new marked.Lexer({
    gfm: true,
    headerIds: true,
    mangle: false,
    breaks: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    smartypants: false,
  })
}
