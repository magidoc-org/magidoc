var e=`---
title: Rollup Parse GraphQL Schema
since: 1.0.0
tags: ['standalone', 'plugin', 'rollup', 'vite']
---

Similar to what the [Rollup Fetch Plugin](/plugins/rollup-fetch-graphql-schema) does, the Rollup Parse Plugin generates an introspection schema from your [SDL files](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-schema-definition-language) and stores the result on the file-system. This approach is usually simpler than interacting with a live endpoint if your API uses Authentication.

> Info: This plugin is also compatible with [ViteJS](https://vitejs.dev/), which is used by SvelteKit.

## Install

First, add the module to your project.

\`\`\`bash
pnpm install -D @magidoc/rollup-plugin-parse-gql-schema
\`\`\`

Then, add the plugin to your \`Rollup/ViteJS\` configuration. Here is an example for a \`svelte.config.js\`.

\`\`\`javascript
import parseGraphQLSchema from '@magidoc/rollup-plugin-parse-gql-schema'

export default {
  kit: {
    vite: {
      plugins: [
        parseGraphQLSchema({
          paths: ['schema/**/*.graphqls'],
        }),
      ],
    },
  },
}
\`\`\`

## Configuration

Some configuration is available as well for the plugin.

\`\`\`javascript
parseGraphQLSchema({
  /**
   * A mandatory list of paths where to the SDL files are located. Glob syntax is supported.
   */
  paths: ['schema/**/*.graphqls'],

  /**
   * The target path where to put the introspection result.
   * This defaults to the src asset directory of SvelteKit, so that the asset can be imported directly.
   *
   * @default 'src/_schema.json'
   */
  target: 'src/_schema.json',
})
\`\`\`
`;export{e as default};
