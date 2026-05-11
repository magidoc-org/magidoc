import { toVariablesFile, UnsupportedVariablesError } from './env/envFileContent'
import magidoc from './variables/magidoc'
import type { AllowedDirective, ExternalLink, Page } from './variables/templates'
import templates from './variables/templates'
import type { Variable } from './variables/variable'

export type { AllowedDirective, ExternalLink, Page, Variable }
export { magidoc, templates, toVariablesFile, UnsupportedVariablesError }
