import { Lexer } from 'marked'
import Slugger from 'github-slugger'

export function defaultSlugger(): Slugger {
  return new Slugger()
}

export function defaultLexer(): Lexer {
  return new Lexer()
}
