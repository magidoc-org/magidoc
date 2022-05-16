var n=`---
title: Magidoc Configuration
---

The website is customizable through different options defined in a \`magidoc.mjs\`. The \`mjs\` extension tells Node to load the javascript file as an [ES Module](https://nodejs.org/api/esm.html), allowing you to use the \`import/export\` syntax.

## Introspection

The introspection query can be fetched from different locations based on the \`type\` property.

### URL

Fetches the introspection schema from a live API endpoint using the introspection query.

\`\`\`javascript
export default {
  introspection: {
    /**
     * Mandatory url type
     */
    type: 'url',

    /**
     * Your API URL.
     */
    url: 'https://your-graphql-api-url.com/graphql',

    /**
     * The HTTP Method to use.
     *
     * @default 'POST'
     */
    method: 'POST',

    /**
     * Some APIs do not follow the GraphQL.js standard, so the introspection may be invalid for your API.
     * If this happens, you can specify a different introspection query to use.
     */
    query: '<introspection-query>',

    /**
     * Optional headers to provide in the request.
     */
    headers: {
      /**
       * Since we use configuration as code, you can perform
       * authentication in this file or use environment variables.
       */
      Authorization: 'Bearer xxx',
    },
  },
}
\`\`\`

### SDL

Parses GraphQL [SDL](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-schema-definition-language) files into the introspection schema to generate the documentation. SDL files usually use the extension \`.graphql\` or \`.graphqls\`.

\`\`\`javascript
export default {
  introspection: {
    /**
     * SDL introspection type
     */
    type: 'sdl',

    /**
     * A mandatory paths array where the schema files can be found.
     * Glob syntax is supported in case your schema is split into multiple files.
     */
    paths: ['schemas/**/*.graphqls'],
  },
}
\`\`\`

### File

Uses the introspection schema from a local JSON file rather than fetching from an endpoint.

\`\`\`javascript
export default {
  introspection: {
    /**
     * Mandatory file type
     */
    type: 'file',

    /**
     * The location of the file. If you use a relative path here,
     * it will be relative to where the Magidoc CLI is launched.
     */
    location: '/a/path/to/schema.json',
  },
}
\`\`\`

### Raw

Provides the JSON schema in a raw string.

\`\`\`javascript
export default {
  introspection: {
    /**
     * Mandatory raw type
     */
    type: 'raw',

    /**
     * The raw content of the introspection result.
     */
    content: '{__schema: {}}',
  },
}
\`\`\`

## Website

The website object specifies different options for building the documentation website.

\`\`\`javascript
// magidoc.mjs

export default {
  introspection: {
    // ...
  },
  website: {
    /**
     * The template to use for the website.
     */
    template: 'carbon-multi-page',

    /**
     * Optional template version to use.
     * Changing this may cause the build to fail depending on the
     * changes between the version of the cli and the template
     *
     * @default current CLI version
     */
    templateVersion: '<magidoc-version>',

    /**
     * The optional output location for the built website.
     *
     * @default './docs'
     */
    output: './docs',

    /**
     * Options to use for the website.
     * Some templates may not support all options.
     * Make sure you check the documentation of the chosen template.
     */
    options: {
      /**
       * Your application title.
       *
       * @default 'Magidoc'
       */
      appTitle: 'Magidoc',

      /**
       * Your application logo. For now, only URLs are supported.
       *
       * @default (magidoc logo)
       */
      appLogo: 'https://website.com/logo.png',

      /**
       * Your application's favicon. For now, only URLs are supported.
       * 
       * @default (magidoc logo)
       */ 
      appFavicon: 'https://website.com/favicon.ico',

      /**
       * The a root path where your website will be served from.
       * It is common to see docs websites hosted on a /docs path.
       * Example: https://your-website.com/docs
       *
       * If your website is served from the root path, leave this undefined.
       *
       * @default undefined
       */
      siteRoot: '/docs',

      /**
       * Customizes the website meta tags in the header of the HTML pages.
       * Any meta tags with the following format are supported:
       *
       * <meta name={key} content={value} />
       *
       * A list of common tags can be found here: https://gist.github.com/whitingx/3840905
       * 
       * @default (arbitrary title, description and image are generated from \`appTitle\` and \`appLogo\`)
       */
      siteMeta: {
        description: 'This is your website description',
        keywords: 'svelte,docs,magidoc,cool',
      },

      /**
       * Customize pages and their content. Each of these pages will be presented before the graphQL documentation.
       * Use this to present your API urls, authentication flows, designs, concepts, or whatever you want.
       *
       * @default (A default Magidoc page)
       */
      pages: [
        {
          /**
           * Each page must have a title for the navbar.
           */
          title: 'First item',

          /**
           * The content. Markdown is supported, but be careful with the indentation.
           * Javascript multi-line templates conserve the indentation you have in your strings, which will not output properly.
           * It is recommended to either get your markdown from files or use a library to un-indent your strings.
           *
           * @see: https://www.npmjs.com/package/dedent
           */
          content: \`
            # Title

            Your markdown here
          \`,
        },
        {
          title: 'Second Item',
          /**
           * Content can also be an array of sub-pages.
           * Some templates may not support multi-level nesting.
           * Make sure to check out the documentation of your template.
           */
          content: [
            {
              title: 'Nested Item',
              content: \`Same as before\`,
            },
          ],
        },
      ],

      /**
       * Optional query generation factory. See more details below
       *
       * @default {}
       */
      queryGenerationFactories: {
        'Int!': 420,
        String: 'abc',
      },
    },
  },
}
\`\`\`

The list of available templates can be found on the [templates page](/templates/introduction).

### queryGenerationFactories

The query generation factories are used to customize query parameters in the generated queries. This is useful in the event that your API contains custom scalars, or that you want to return custom values for a type.

To know more about the extent of what is possible with \`queryGenerationFactories\`, read the [query generator](/plugins/graphql-query-generator) documentation.

> Warning: Magidoc CLI uses environment variables to pass options to the templates, which means that functions are not supported here, unlike when using the \`graphql-query-generator\` directly. If you wish to have more customization options of the output variables, you will need to use the [init command](/cli/init) and customize the template directly.
`;export{n as default};
