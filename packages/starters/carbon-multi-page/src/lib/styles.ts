import { templates } from '@magidoc/plugin-starter-variables'
import { getOrDefault } from './variables'

export const siteStyles = getOrDefault(templates.CUSTOM_STYLES, [])
