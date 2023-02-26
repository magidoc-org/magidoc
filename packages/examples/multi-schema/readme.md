# Multi-schema

Here is an example of multi-schema setup for Magidoc. This allows to document multiple GraphQL APIs (different URLs) in one website.

## How it works
The [package.json](./package.json) `generate` script calls magidoc multiple times with different configurations to build a new website output that is the aggregation of all the other ones. Each `generate` script passes an environment variable to the magidoc process.

Inside [magidoc.mjs](./magidoc.mjs), we make sure to return the right information depending on what documentation website we are currently generating. If you have a significant amount of websites with different configurations, you may create other javascript files that `magidoc.mjs` will import. 

Finally, it uses a default file [index.html](./website/index.html) in the output folder to redirect to the website of your choice when hitting the root URL. This is optional depending on how your website is hosted.


## Setup

```bash
pnpm install
```

## All websites

You can build all websites by running

```bash
pnpm generate
```

and then preview the output

```bash
pnpm preview
```

## Individual websites

You can also develop, build and preview individual websites separately by running these:

```bash
# Dev
pnpm dev:first
pnpm dev:second

# Generate
pnpm generate:first
pnpm generate:second

# Preview
pnpm preview:first
pnpm preview:second
```
