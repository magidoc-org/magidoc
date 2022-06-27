import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { ENV_FILE_LOCATION } from './magidoc.config.js'
import { optimizeImports } from 'carbon-preprocess-svelte'
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import _ from 'lodash'
import fs from 'fs'
import { magidoc, templates } from '@magidoc/plugin-starter-variables'

function loadVariables() {
  if (!fs.existsSync(ENV_FILE_LOCATION)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(ENV_FILE_LOCATION))
}

const variables = loadVariables()

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
      base: templates.SITE_ROOT.get(variables) ?? '',
    },
    vite: {
      plugins: [
        {
          name: 'init-variables',
          buildStart: () => {
            if (!fs.existsSync(ENV_FILE_LOCATION)) {
              fs.writeFileSync(ENV_FILE_LOCATION, '{}')
            }
          },
        },
        {
          name: 'variables-change-handler',
          handleHotUpdate(ctx) {
            const isVariables = ctx.file.includes(
              ENV_FILE_LOCATION.replace('./', ''),
            )

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
        !magidoc.MAGIDOC_GENERATE.get(variables)
          ? fetchGraphQLSchema({
              url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
            })
          : null,
      ].filter((plugin) => !!plugin),
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
