import { templates } from '@magidoc/plugin-starter-variables'
import { getOrDefault } from './variables'

const DEFAULT_LOGO =
  'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_horizontal.png'

const DEFAULT_TITLE = 'GraphQL Documentation'

const DEFAULT_DESCRIPTION =
  'GraphQL documentation for our APIs - Built with Magidoc'

export type WebsiteData = {
  appTitle: string
  appIcon: string
}

export type Meta = {
  name: string
  content: string
}

export function getAppLogo(): string {
  return getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
}

export function getAppTitle(): string {
  return getOrDefault(templates.APP_TITLE, DEFAULT_TITLE)
}

export function getSiteMeta(): ReadonlyArray<Meta> {
  const meta = getOrDefault(templates.SITE_META, {})
  const merged: Record<string, string | undefined> = {
    keywords: `graphql,api,documentation`,
    description: DEFAULT_DESCRIPTION,
    'og:title': getAppTitle(),
    'og:type': 'article',
    'og:image': getAppLogo(),
    'og:site_name': getAppTitle(),
    'og:description': meta['description'] || DEFAULT_DESCRIPTION,
    ...meta,
  }

  return Object.keys(merged)
    .map((key) => ({
      name: key,
      content: merged[key],
    }))
    .filter((meta): meta is Meta => meta.content !== undefined)
}
