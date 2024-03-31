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
    url: 'https://spacex-production.up.railway.app/graphql',
  },
  website: {
    template: 'carbon-multi-page',
    staticAssets: relativePath('./assets'),
    options: {
      appTitle: 'SpaceX GraphQL API',
      appLogo: '/logo.png',
      appFavicon: '/favicon.png',
      siteMeta: {
        description: "Magidoc demo for SpaceX's GraphQL API.",
        'og:description': "Magidoc demo for SpaceX's GraphQL API.",
      },
      pages: [
        {
          title: 'Welcome',
          content: markdown`
            # 👋 Hi

            Welcome to [SpaceX](https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/explorer)'s GraphQL documentation
            generated with [Magidoc](https://github.com/magidoc-org/magidoc), a free open source software designed to build customizable static GraphQL documentation websites with little effort.

            You wonder how easy it was to build this website? Have a look at the [configuration file](https://github.com/magidoc-org/magidoc/blob/main/packages/examples/spacex/magidoc.mjs).

            ## Wanna learn more?

            Head to the docs to learn how to [generate your own static GraphQL documentation website](https://magidoc.js.org/introduction/welcome)!
          `,
        }
      ],
    },
  },
}
