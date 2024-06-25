import { templates } from '@magidoc/plugin-starter-variables'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { optimizeImports } from 'carbon-preprocess-svelte'
import _ from 'lodash'
import { loadVariables } from './magidoc.config.js'

const variables = loadVariables()
const base = templates.SITE_ROOT.getOrDefault(variables, '')

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: [vitePreprocess(), optimizeImports()],
  kit: {
    adapter: adapter({
      strict: false,
    }),
    paths: {
      base,
    },
  },
}

export default config
