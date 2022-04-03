import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'

/**
 * @type {import('@sveltejs/kit').Config}
 * @type {import('@magidoc/plugin-code-mirror').default}
 */
export default {
  preprocess: [preprocess(), optimizeImports()],
  kit: {
    adapter: adapter(),
    prerender: {
      enabled: true,
      crawl: true,
      default: true,
    },
    vite: {
      plugins: [
        fetchGraphQLSchema({
          url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
        }),
      ],
      ssr: {
        noExternal: [
          'codemirror',
          'codemirror-graphql'
        ],
      },
    },
  },
}
