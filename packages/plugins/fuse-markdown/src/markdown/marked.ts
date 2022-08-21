import { marked } from 'marked'

export function defaultSlugger(): marked.Slugger {
  return new marked.Slugger()
}

export function defaultLexer(): marked.Lexer {
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
