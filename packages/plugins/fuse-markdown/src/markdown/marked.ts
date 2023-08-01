import { Lexer, Slugger } from 'marked'

export function defaultSlugger(): Slugger {
  return new Slugger()
}

export function defaultLexer(): Lexer {
  return new Lexer()
}
