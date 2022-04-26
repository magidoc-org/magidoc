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
       * @default magidoc logo
       */
      appLogo: 'https://website.com/logo.png',

      /**
       * Optional query generation factory. See more details below
       * 
       * @default {}
       */
      queryGenerationFactories: {
        "Int!": 420,
        String: "abc",
      }
    },
  },
}
\`\`\`

The list of available templates can be found on the [templates page](/templates/introduction).

### queryGenerationFactories 
The query generation factories are used to customize query parameters in the generated queries. This is useful in the event that your API contains custom scalars, or that you want to return custom values for a type. 

To know more about the extent of what is possible with \`queryGenerationFactories\`, read the [query generator](/plugins/graphql-query-generator) documentation. 

> Warning: Magidoc CLI uses environment variables to pass options to the templates, which means that functions are not supported here, unlike when using the \`graphql-query-generator\` directly. If you wish to have more customization options of the output variables, you will need to use the [init command](/cli/init) and customize the template directly. `;export{n as default};
