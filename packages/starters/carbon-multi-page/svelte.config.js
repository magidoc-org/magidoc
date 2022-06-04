import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { loadEnv } from 'vite'

import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import { magidoc, templates } from '@magidoc/plugin-starter-variables'

function getEnv() {
  return loadEnv('default', '.')
}

const env = getEnv()

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: [preprocess(), optimizeImports()],
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    paths: {
      base: templates.SITE_ROOT.vite.get(env) ?? '',
    },
    vite: {
      plugins: [
        {
          name: 'test',
          config: (config) => {
            const newEnv = getEnv()
            return {
              define: {
                ...Object.keys(newEnv).reduce(
                  (acc, key) => ({
                    ...acc,
                    [`import.meta.env.${key}`]: JSON.stringify(newEnv[key].replace('\`')),
                  }),
                  {},
                ),
              },
            }
          },
        },
        // Skip this rollup plugin if we are in the context of magidoc generate command
        !magidoc.MAGIDOC_GENERATE.vite.get(env)
          ? fetchGraphQLSchema({
              url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
            })
          : null,
      ],
      ssr: {
        noExternal:
          process.env.NODE_ENV == 'development'
            ? []
            : ['prettier', 'prismjs', 'marked', 'dotenv'],
      },
    },
  },
}

export default config
