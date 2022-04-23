var n=`---
title: Template - Carbon Multi-Page
since: 1.0.0
tags: ['svelte']
---
This starter uses IBM's [Carbon Design](https://carbondesignsystem.com/) in a multi-page documentation, meaning that each type, query and mutation gets its own dedicated page.  

See the template's [readme](https://github.com/magidoc-org/magidoc/blob/main/packages/starters/carbon-multi-page/README.md) for further details on how to use this template when using the [init](/cli/init) command.

## Supported options
The following options are supported and can be provided via the [magidoc.mjs](/cli/magidoc-configuration) config file. 

\`\`\`javascript
// magidoc.mjs

export default {
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'Magidoc',
      appLogo: '/home/sunny/Documents/christmas.png',
    },
  },
}
\`\`\``;export{n as default};
