import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import { string } from "rollup-plugin-string";

/**
 * @type {import('@sveltejs/kit').Config}
 * @type {import('@magidoc/plugin-code-mirror').default}
 */
const config = {
  preprocess: [preprocess(), optimizeImports()],
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter(),
    prerender: {
      default: true
    },
    vite: {
      plugins: [string({
        include: "**/md"
      })],
      ssr: {
        noExternal: ['codemirror', 'codemirror-graphql'],
      },
    },
  },
}

export default config
