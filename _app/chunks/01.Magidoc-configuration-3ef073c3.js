var e=`---
title: Magidoc Configuration
---

The generated website is customizable through the \`magidoc.mjs\`. The \`mjs\` extension is the way to tell node the load the Javascript file as an \`ECMAScript module\`, allowing you to use the \`import/export\` syntax.

Here is the exhaustive options available to use in \`magidoc.mjs\`.

\`\`\`javascript
// magidoc.mjs

export default {
  introspection: {
    // The URL to your API. 
    url: 'https://your-graphql-api-url.com/graphql',
    // The HTTP Method to use. Defaults to POST.
    method: 'POST',
    // Optional headers to provide in the request
    headers: {
      // Since we use configuration as code, you can perform authentication in this file or use environment variables
      Authorization: 'Bearer xxx',
    },
  },
  website: {
    // The template to use for the website
    template: 'carbon-multi-page',
    // Options to use for the website. There options are passed to the templates through environment variable at build time. 
    // Some templates may not support every possible options. Make sure you check the documentation related to the starter of your choice to know which options are available.
    options: {
      // The application title.
      appTitle: 'Magidoc',
      // The application logo. For now, only URL are supported.
      appLogo: 'https://github.com/magidoc-org/magidoc/blob/main/logo/logo_horizontal.png?raw=true',
    },
  },
}
\`\`\``;export{e as default};
