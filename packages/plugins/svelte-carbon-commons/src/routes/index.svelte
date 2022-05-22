<script>
  import CarbonMarkdown from '$lib/markdown/CarbonMarkdown.svelte'
  import 'carbon-components-svelte/css/g10.css'
  import 'prismjs/components/prism-graphql.js'
</script>

<body style="padding: 3rem">
  <CarbonMarkdown
    options={{
      baseUrl: '/docs',
    }}
    source={`
# 👋 Hi

Welcome to [FaunaDB](https://fauna.com/blog/try-faunadbs-graphql-api)'s GraphQL documentation
generated with [Magidoc](https://github.com/magidoc-org/magidoc), a free open source software designed to build customizable static GraphQL documentation websites with little effort.

You wonder how easy it was to build this website? Have a look at the [configuration file](https://github.com/magidoc-org/magidoc/blob/main/packages/examples/fauna/magidoc.mjs).

Here is a [relative URL](/test)
## Wanna learn more?

:::notification type="error" test="lol"
**test** this
:::

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

## Another subtitle

# ⚠️ Blockquotes

Your can show error, warning, info and success blockquotes.

> Success: Good job!

> Info: You like info? There you go. **They support inner markdown**!

> Warning: You like warnings too? Well here's one.

> Error: Oops, something happened? 🤷

# 📚 Tables

Tables are supported as well.


| Animal | Emoji | Sound |
| ---------- | --------- | --------- |
| Dog        | 🐶        | Woof!     |
| Cat        | 🐱        | Meow!     |
| Cow        | 🐄        | Moo       |



`}
  />
</body>
