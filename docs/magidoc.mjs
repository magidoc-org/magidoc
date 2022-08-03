import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const pages = (await import(`./pages.mjs?id=${Math.random()}`)).default

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import("@magidoc/cli").MagidocConfiguration}
 */
const config = {
  introspection: {
    type: 'file',
    location: path.join(__dirname, 'empty-schema.json'),
  },
  website: {
    template: path.join(__dirname, '../packages/starters/carbon-multi-page'),
    output: path.join(__dirname, 'build'),
    staticAssets: path.join(__dirname, 'assets'),
    options: {
      appTitle: 'Magidoc',
      appFavicon:
        'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_full.png',
      pages: pages,
      externalLinks: [
        {
          label: 'Github',
          href: 'https://github.com/magidoc-org/magidoc',
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
          'Fast and highly customizable GraphQL documentation generator',
        'og:description':
          'Fast and highly customizable GraphQL documentation generator',
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
      path.join(__dirname, './pages'),
      path.join(__dirname, './pages.mjs'),
    ],
  },
}

export default config
