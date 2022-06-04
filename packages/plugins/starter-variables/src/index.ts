import templates from './variables/templates'
import magidoc from './variables/magidoc'
import { toVariablesFile, UnsupportedOptionError } from './env/envFileContent'
import type { Variable } from './variables/variable'
import type { Page } from './variables/templates'

export { templates }
export { magidoc }
export type { Variable, Page }
export { toVariablesFile, UnsupportedOptionError }
