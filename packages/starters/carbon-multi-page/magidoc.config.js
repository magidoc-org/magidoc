import { templates } from '@magidoc/plugin-starter-variables'

/**
 * These configurations are useful for the CLI to generate websites using user-defined configuration.
 */
export const SUPPORTED_OPTIONS = [
  templates.APP_LOGO,
  templates.APP_TITLE,
  templates.QUERY_GENERATION_FACTORIES,
  templates.PAGES,
]

export const SCHEMA_TARGET_LOCATION = './src/_schema.json'
