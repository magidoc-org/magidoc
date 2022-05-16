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
  templates.QUERY_GENERATION_FACTORIES,
  templates.PAGES,
]

export const SCHEMA_TARGET_LOCATION = './src/_schema.json'

export const STATIC_ASSETS_LOCATION = './static'
