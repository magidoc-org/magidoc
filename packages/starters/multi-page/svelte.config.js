import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'

/**
 * @type {import('@sveltejs/kit').Config}
 */
export default {
  preprocess: [preprocess(), optimizeImports()],
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    vite: {
      plugins: [
        fetchGraphQLSchema({
          url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
        }),
      ],
      ssr: {
        // TODO - this is temporary. There seems to be an issue with SSR
        noExternal: process.env.NODE_ENV == 'development' ? [] : ['prettier', 'prismjs'],
      },
    },
  },
}
