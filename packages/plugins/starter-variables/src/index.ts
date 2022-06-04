import templates from './variables/templates'
import magidoc from './variables/magidoc'
import {
  parseEnv,
  escapeEnv,
  unescapeEnv,
  toEnv,
  UnsupportedOptionError,
} from './env/envFileContent'
import type { Variable, ViteVariable } from './variables/variable'
import type { Page } from './variables/templates'

export { templates }
export { magidoc }
export type { Variable, ViteVariable, Page }
export { toEnv, parseEnv, escapeEnv, unescapeEnv, UnsupportedOptionError }
