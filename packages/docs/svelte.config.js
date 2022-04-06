import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import { string } from 'rollup-plugin-string'

const dev = process.env.NODE_ENV === 'development';

/**
 * @type {import('@sveltejs/kit').Config}
 */
export default {
  preprocess: [preprocess(), optimizeImports()],
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    paths: {
			base: dev ? '' : '/magidoc',
			base: dev ? '' : '/magidoc',
		},
    vite: {
      plugins: [
        string({
          include: '**/*.md',
        }),
        {
          handleHotUpdate(ctx) {
            const file = ctx.file.substring(ctx.file.indexOf('/lib/') + 5)

            const isMd = /.*\.md$/g.exec(file)
            if (isMd) {
              ctx.server.ws.send({
                type: 'custom',
                event: 'markdown-update',
                data: {
                  file: file,
                },
              })

              return []
            }

            return ctx.modules
          },
        },
      ],
      ssr: {
        noExternal: ['@magidoc/plugin-prismjs', 'prismjs', 'prism-svelte'],
      },
    },
  },
}
