import templates from './variables/templates'
import magidoc from './variables/magidoc'
import {
  toVariablesFile,
  UnsupportedVariablesError,
} from './env/envFileContent'
import type { Variable } from './variables/variable'
import type {
  Page,
  ExternalLink,
  AllowedDirective,
} from './variables/templates'

export type { Variable, Page, ExternalLink, AllowedDirective }
export { templates }
export { magidoc }
export { toVariablesFile, UnsupportedVariablesError }
