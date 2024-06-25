import fs from 'fs'
import { magidoc } from '@magidoc/plugin-starter-variables'
import { parseGraphQLSchema } from '@magidoc/rollup-plugin-gql-schema'
import { sveltekit } from '@sveltejs/kit/vite'
import { type HmrContext, defineConfig } from 'vite'
// @ts-ignore
import { ENV_FILE_LOCATION, loadVariables } from './magidoc.config.js'

const variables = loadVariables()

export default defineConfig({
  plugins: [
    // Skip this rollup plugin if we are in the context of magidoc generate command
    !magidoc.MAGIDOC_GENERATE.get(variables)
      ? parseGraphQLSchema({
          paths: ['../test-schema.graphql'],
          format: 'sdl',
        })
      : null,
    {
      name: 'init-variables',
      buildStart: () => {
        if (!fs.existsSync(ENV_FILE_LOCATION)) {
          fs.writeFileSync(ENV_FILE_LOCATION, '{}')
        }
      },
    },
    sveltekit(),
    {
      name: 'variables-change-handler',
      handleHotUpdate(ctx: HmrContext) {
        const isVariables = ctx.file.includes(ENV_FILE_LOCATION.replace('./', ''))

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
  ].filter((plugin) => !!plugin),
})
