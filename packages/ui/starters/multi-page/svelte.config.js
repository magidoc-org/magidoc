import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess(), optimizeImports()],
  prerender: {
    enabled: false,
  },
  kit: {
    adapter: adapter(),
    prerender: {
      enabled: false,
    },
    vite: {
      ssr: {
        noExternal: [
          'graphql',
          'codemirror',
          'codemirror-graphql',
          'prettier',
          'glob-to-regexp',
        ],
      },
    },
  },
}

export default config
