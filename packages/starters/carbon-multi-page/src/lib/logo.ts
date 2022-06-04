import { templates } from '@magidoc/plugin-starter-variables'
import { getOrDefault } from './variables'

export const DEFAULT_LOGO =
  'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_horizontal.png'

export const appLogo = getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
