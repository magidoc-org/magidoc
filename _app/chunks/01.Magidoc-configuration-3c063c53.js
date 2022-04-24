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
    },
  },
}
\`\`\`

The list of available templates can be found on the [templates page](/templates/introduction).
`;export{n as default};
