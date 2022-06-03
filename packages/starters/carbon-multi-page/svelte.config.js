import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import { magidoc, templates } from '@magidoc/plugin-starter-variables'
import fs from 'fs'
import FullReload from 'vite-plugin-full-reload'

function getEnv() {
  return JSON.parse(fs.readFileSync('./magidoc-env.json', 'utf8').toString())
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
        FullReload(['magidoc-env.json']),
        {
          name: 'test',
          config: ({ define }) => {
            const env = getEnv()
            return {
              define: {
                ...(define || {}),
                ...Object.keys(env).reduce(
                  (acc, key) => ({
                    ...acc,
                    [`import.meta.env.${key}`]: JSON.stringify(env[key]),
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
