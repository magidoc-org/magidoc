import { fileURLToPath } from 'url'
import path from 'path'

function markdown(string) {
  // Takes the first indent and trims that length from everywhere.
  // Markdown templates don't like the extra space at the beginning.
  const target = string[0]
  const trimSize = /^\s+/.exec(string)[0].length
  return target
    .split('\n')
    .map((line) => line.substr(trimSize - 1))
    .join('\n')
}

function relativePath(target) {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), target)
}

export default {
  introspection: {
    type: 'url',
    url: 'https://graphql.fauna.com/graphql',
    headers: {
      // https://fauna.com/blog/try-faunadbs-graphql-api
      // Those are public credentials
      Authorization: `Basic Zm5BRFFVdWNRb0FDQ1VpZDAxeXVIdWt2SnptaVY4STI4a2R6Y0p2UDo=`,
    },
  },
  website: {
    template: 'carbon-multi-page',
    staticAssets: relativePath('./assets'),
    options: {
      appTitle: 'FaunaDB',
      appLogo: '/logo.png',
      appFavicon: '/favicon.png',
      siteMeta: {
        description: "Magidoc demo for FaunaDB's GraphQL API.",
        'og:description': "Magidoc demo for FaunaDB's GraphQL API.",
      },
      pages: [
        {
          title: 'Welcome',
          content: markdown`
           
          `,
        }
      ],
    },
  },
}
