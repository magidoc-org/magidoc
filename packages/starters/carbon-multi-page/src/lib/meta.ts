import _ from 'lodash'

export type WebsiteData = {
  appTitle: string
  appIcon: string
}

export type Meta = {
  name: string
  content: string
}

export function generateMeta(
  data: WebsiteData,
  optionalMeta?: Record<string, string | undefined>,
): Meta[] {
  return _.map(
    {
      ...defaultMeta(data),
      ...(optionalMeta || {}),
    },
    (value, key) => ({
      name: key,
      content: value,
    }),
  ).filter((current): current is Meta => !!current.content)
}

function defaultMeta(data: WebsiteData): Record<string, string> {
  const description = `${data.appTitle}'s GraphQL documentation`
  return {
    keywords: `graphql,api,documentation,${data.appTitle}`,
    description: description,
    'og:title': data.appTitle,
    'og:type': 'article',
    'og:image': data.appIcon,
    'og:site_name': data.appTitle,
    'og:description': description,
  }
}
