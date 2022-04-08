var e=`---
title: Rollup fetch GraphQL Schema plugin
since: 1.0.0
tags: ['standalone', 'plugin', 'rollup', 'vite']
---

> Info: This plugin is a standalone plugin and can be used outside of Magidoc, and even with other technologies than Svelte.

This rollup plugin fetches the GraphQL Schema required by Magidoc Plugins and to build your website documentation. It performs a full [GraphQL Introspection Query](https://graphql.org/learn/introspection/) and stores the result on the file-system. This approach keeps your documentation independent from the actual API.

## Install

First, add the module to your project.

\`\`\`bash
pnpm install -D @magidoc/rollup-plugin-fetch-gql-schema
\`\`\`

Then, add the plugin to your \`ViteJS/Rollup\` configuration. Here is an example for a \`svelte.config.js\`.

\`\`\`javascript
import fetchGraphQLSchema from '@magidoc/rollup-plugin-fetch-gql-schema'

export default {
  kit: {
    vite: {
      plugins: [
        fetchGraphQLSchema({
          url: 'https://your-api-url.com',
        }),
      ],
    },
  },
}
\`\`\`

## Configuration

Configurations are available for the plugin to change the behavior of the introspection query. Here is the full configuration example and its default values.

\`\`\`javascript
fetchGraphQLSchema({
    // This is mandatory. Put your API URL here.
    url: 'https://your-api-url.com',
    // The HTTP method to use for the introspection query.
    method: 'POST' ,
    // The HTTP headers to provide in the introspection query.
    // Mainly useful if your API requires authentication.
    headers: {},
    // The target path where to put the introspection query result.
    // This defaults to the static asset directory of SvelteKit.
    target: 'static/_schema.json',
})
\`\`\`
`;export{e as default};
