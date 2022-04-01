import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import { string } from 'rollup-plugin-string'

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
    vite: {
      plugins: [
        string({
          include: '**/*.md',
        }),
      ],
      server: {
        watch: {
          include: ['**/*.md'],
        }
      },
      ssr: {
        noExternal: ['prismjs'],
      },
    },
  },
}

export default config
