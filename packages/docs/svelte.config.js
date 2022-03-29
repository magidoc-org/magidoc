import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'

/**
 * @type {import('@sveltejs/kit').Config}
 * @type {import('@magidoc/plugin-code-mirror').default}
 */
const config = {
  preprocess: [preprocess(), optimizeImports()],
  kit: {
    adapter: adapter(),
    prerender: {
      enabled: true,
      crawl: true,
      default: true,
    },
    vite: {
      ssr: {
        noExternal: ['codemirror', 'codemirror-graphql'],
      },
    },
  },
}

export default config
