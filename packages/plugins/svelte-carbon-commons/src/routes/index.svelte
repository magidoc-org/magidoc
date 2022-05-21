<script>
  import 'carbon-components-svelte/css/g10.css'
  import 'prismjs/components/prism-graphql.js'
  import CarbonMarkdown from '$lib/markdown/CarbonMarkdown.svelte'
</script>

<body style="padding: 3rem">
  <CarbonMarkdown
    base={'/docs/'}
    source={`
# 👋 Hi

Welcome to [FaunaDB](https://fauna.com/blog/try-faunadbs-graphql-api)'s GraphQL documentation
generated with [Magidoc](https://github.com/magidoc-org/magidoc), a free open source software designed to build customizable static GraphQL documentation websites with little effort.

You wonder how easy it was to build this website? Have a look at the [configuration file](https://github.com/magidoc-org/magidoc/blob/main/packages/examples/fauna/magidoc.mjs).

## Wanna learn more?

Head to the [docs](https://magidoc-org.github.io/magidoc/introduction/welcome)!

# 💻 Code blocks

You can input code blocks directly in your custom pages, and they will be rendered using PrismJS.

~~~graphql
query {
  look(at: "this") {
    thing
  }
}
~~~
`}
  />
</body>
