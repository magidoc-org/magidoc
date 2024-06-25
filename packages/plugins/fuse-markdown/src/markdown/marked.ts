import Slugger from 'github-slugger'
import { Lexer } from 'marked'

export function defaultSlugger(): Slugger {
  return new Slugger()
}

export function defaultLexer(): Lexer {
  return new Lexer()
}
