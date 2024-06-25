import { UnsupportedVariablesError, toVariablesFile } from './env/envFileContent'
import magidoc from './variables/magidoc'
import templates from './variables/templates'
import type { AllowedDirective, ExternalLink, Page } from './variables/templates'
import type { Variable } from './variables/variable'

export type { Variable, Page, ExternalLink, AllowedDirective }
export { templates }
export { magidoc }
export { toVariablesFile, UnsupportedVariablesError }
