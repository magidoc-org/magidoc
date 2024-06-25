import fs from 'fs'
import { templates } from '@magidoc/plugin-starter-variables'

/**
 * These configurations are useful for the CLI to generate websites using user-defined configuration.
 */
export const SUPPORTED_OPTIONS = [
  templates.APP_LOGO,
  templates.APP_TITLE,
  templates.APP_FAVICON,
  templates.SITE_ROOT,
  templates.SITE_META,
  templates.CUSTOM_STYLES,
  templates.FIELDS_SORTING,
  templates.ARGUMENTS_SORTING,
  templates.QUERY_GENERATION_FACTORIES,
  templates.PAGES,
  templates.EXTERNAL_LINKS,
  templates.DIRECTIVES,
]

export const SCHEMA_TARGET_LOCATION = './src/_schema.graphqls'

export const STATIC_ASSETS_LOCATION = './static'

export const ENV_FILE_LOCATION = './src/_variables.json'

export function loadVariables() {
  if (!fs.existsSync(ENV_FILE_LOCATION)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(ENV_FILE_LOCATION))
}
