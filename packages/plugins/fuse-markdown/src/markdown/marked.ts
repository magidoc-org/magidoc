import { marked } from 'marked'

export function defaultSlugger(): marked.Slugger {
  return new marked.Slugger()
}

export function defaultLexer(): marked.Lexer {
  return new marked.Lexer()
}
