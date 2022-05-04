import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { optimizeImports } from 'carbon-preprocess-svelte'
import { string } from 'rollup-plugin-string'

const dev = process.env.NODE_ENV === 'development'

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
        noExternal: [
          '@magidoc/plugin-svelte-carbon-commons',
          '@magidoc/plugin-svelte-prismjs',
          'prismjs',
          'prism-svelte',
        ],
      },
    },
  },
}

`
Introducing Magidoc: Fast and highly customizable GraphQL documentation generator
`

`
https://magidoc-org.github.io/magidoc
`

`
I have been working on the last few months on a new alternative solution to generate modern static GraphQL documentation, focusing mainly on customization and providing enhanced, more useful details to the users than with the existing solutions.

Written from scratch, Magidoc helps you build GraphQL documentation websites in a few seconds. It aims to offer a vast variety of plugins and templates to make all this super convenient and flexible.

Docs: https://magidoc-org.github.io/magidoc
Repo: https://github.com/magidoc-org/magidoc
`
