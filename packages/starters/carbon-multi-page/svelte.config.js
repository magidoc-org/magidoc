import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { loadEnv } from 'vite'

import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import _ from 'lodash'
import {
  magidoc,
  templates,
  unescapeEnv,
} from '@magidoc/plugin-starter-variables'

function getEnv() {
  return _.mapValues(loadEnv('default', '.'), (value) => unescapeEnv(value))
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
        // {
        //   name: 'test',
        //   config: (config) => {
        //     const newEnv = getEnv()
        //     console.log(newEnv)
        //     return {
        //       define: {
        //         ...Object.keys(newEnv).reduce(
        //           (acc, key) => ({
        //             ...acc,
        //             [`import.meta.env.${key}`]: newEnv[key],
        //           }),
        //           {},
        //         ),
        //       },
        //     }
        //   },
        // },
        {
          handleHotUpdate(ctx) {
            console.log('wow')
            const isVariables = ctx.file.indexOf('/lib/variables/variables.ts') > 0
            console.log(ctx.file)
            console.log(isVariables)
            if (isVariables) {
              ctx.server.ws.send({
                type: 'custom',
                event: 'variables-changed',
              })

              return []
            }

            return ctx.modules
          },
        },
        // Skip this rollup plugin if we are in the context of magidoc generate command
        !magidoc.MAGIDOC_GENERATE.vite.get(env)
          ? fetchGraphQLSchema({
              url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
            })
          : null,
      ],
      optimizeDeps: [
        'prismjs/plugins/line-numbers/prism-line-numbers',
        'prismjs/plugins/toolbar/prism-toolbar',
        'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard',
        'marked',
        'svelte/internal',
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
