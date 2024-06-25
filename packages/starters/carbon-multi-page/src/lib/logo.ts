import { templates } from '@magidoc/plugin-starter-variables'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import { getOrDefault, getSiteRoot } from './variables'

export const DEFAULT_LOGO = 'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_horizontal.png'

const APP_LOGO = getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
export const appLogoURL = urlUtils.isRelative(APP_LOGO) ? urlUtils.joinUrlPaths(getSiteRoot(), APP_LOGO) : APP_LOGO
