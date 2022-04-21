import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import { magidoc } from '@magidoc/plugin-starter-variables'

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
        // Skill this rollup plugin if we are in the context of magidoc generate command
        magidoc.MAGIDOC_GENERATE.vite.get(process.env)
          ? fetchGraphQLSchema({
              url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
            })
          : null,
      ],
      ssr: {
        // TODO - this is temporary. There seems to be an issue with SSR
        noExternal:
          process.env.NODE_ENV == 'development' ? [] : ['prettier', 'prismjs'],
      },
    },
  },
}
