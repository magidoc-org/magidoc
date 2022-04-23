var e=`---
title: Get Started
---


## 1. Create a configuration file

First thing to do is to create yourself a configuration file for Magidoc to build your website how you want. Here is the most minimal \`magidoc.mjs\` you can have.

\`\`\`javascript
// magidoc.mjs

export default {
  introspection: {
    url: 'https://graphiql-test.netlify.app/.netlify/functions/schema-demo',
  },
  website: {
    template: 'carbon-multi-page',
  },
}
\`\`\`

For the full reference, see the dedicated [Magidoc configuration](/cli/magidoc-configuration) page.

## 2. Run Magidoc Generate
\`\`\`bash
npx @magidoc/cli generate
\`\`\`
For more details on how to use the \`generate\` command, see the [related documentation](/cli/generate).
## 3. That's it!
The built static website should be output in the \`./docs\` folder. To preview the website locally, run the following command.

\`\`\`bash
npx @magidoc/cli preview
\`\`\``;export{e as default};
