import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import {
  magidoc,
  templates,
  readEnvFile,
} from '@magidoc/plugin-starter-variables'
import fs from 'fs'

const env = {
  ...process.env,
  ...readEnvFile('./.env'),
}

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
        // Skip this rollup plugin if we are in the context of magidoc generate command
        !magidoc.MAGIDOC_GENERATE.vite.get(env)
          ? fetchGraphQLSchema({
              url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
            })
          : null,
      ],
      ssr: {
        noExternal:
          env.NODE_ENV == 'development'
            ? []
            : ['prettier', 'prismjs', 'marked', 'dotenv'],
      },
    },
  },
}

export default config
