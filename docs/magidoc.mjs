import { fileURLToPath } from 'node:url'

const { pages } = await import(`./pages.mjs?id=${Math.random()}`)

/**
 * @type {import("@magidoc/cli").MagidocConfiguration}
 */
const config = {
  introspection: {
    type: 'none',
  },
  website: {
    template: fileURLToPath(
      new URL('../packages/starters/carbon-multi-page', import.meta.url),
    ),
    output: fileURLToPath(new URL('./build', import.meta.url)),
    staticAssets: fileURLToPath(new URL('./assets', import.meta.url)),
    options: {
      appTitle: 'Magidoc',
      appFavicon:
        'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_full.png',
      pages: pages,
      externalLinks: [
        {
          label: 'Star us!',
          kind: 'GitHub',
          href: 'https://github.com/magidoc-org/magidoc',
          position: 'header',
        },
        {
          group: 'Demo',
          label: 'Carbon-Multi-Page',
          href: 'https://magidoc-carbon-multi-page.netlify.app/welcome',
        },
        {
          group: 'Articles',
          label: 'Medium tutorial',
          kind: 'medium',
          href: 'https://medium.com/@sunnypelletier01/autogenerate-graphql-documentation-with-magidoc-53235f5d6dec',
        },
        {
          group: 'Articles',
          label: 'Why static documentation?',
          kind: 'article',
          href: 'https://dev.to/pelletier197/why-you-need-static-documentation-for-your-graphql-api-19ol',
        },
        {
          group: 'Others',
          label: 'Product Hunt',
          kind: 'article',
          href: 'https://www.producthunt.com/posts/magidoc',
        },
      ],
      siteMeta: {
        description:
          'Fully featured, fast and highly customizable GraphQL static documentation website generator.',
        'og:description':
          'Fully featured, fast and highly customizable GraphQL static documentation website generator.',
        keywords:
          'svelte,sveltekit,svelte-kit,prismjs,markedjs,marked,graphql,documentation,docs,static,javascript,nodejs',
        author: 'Magidoc-org',
        'og:title': 'Magidoc',
        'og:type': 'article',
        'og:image':
          'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_full.png',
      },
    },
  },
  dev: {
    watch: [
      fileURLToPath(new URL('./pages', import.meta.url)),
      fileURLToPath(new URL('./pages.mjs', import.meta.url)),
    ],
  },
}

export default config
