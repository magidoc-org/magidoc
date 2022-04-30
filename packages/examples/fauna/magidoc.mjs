function markdown(string) {
  // Takes the first indent and trims that length from everywhere.
  // Markdown templates don't like the extra space at the begining.
  const target = string[0]
  const trimSize = /^\s+/.exec(string)[0].length
  return target
    .split('\n')
    .map((line) => line.substr(trimSize - 1))
    .join('\n')
}

export default {
  introspection: {
    type: 'url',
    url: 'https://graphql.fauna.com/graphql',
    headers: {
      // https://fauna.com/blog/try-faunadbs-graphql-api
      // Those are public credentials
      Authorization: `Basic Zm5BRFFVdWNRb0FDQ1VpZDAxeXVIdWt2SnptaVY4STI4a2R6Y0p2UDo=`,
    },
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'FaunaDB',
      pages: [
        {
          title: 'Welcome',
          content: markdown`
            # 👋 Hi

            Welcome to [FaunaDB](https://fauna.com/blog/try-faunadbs-graphql-api)'s GraphQL documentation
            generated with [Magidoc](https://github.com/magidoc-org/magidoc), a free open source software designed to build customizable static GraphQL documentation websites with little effort.

            You wonder how easy it was to build this website? Have a look at the [configuration file](https://github.com/magidoc-org/magidoc/blob/main/packages/examples/fauna/magidoc.mjs).

            ## Wanna learn more?

            Head to the [docs](https://magidoc-org.github.io/magidoc/introduction/welcome)!
          `,
        },
        {
          title: 'Samples',
          content: [
            {
              title: 'Code',
              content: markdown`
                # 💻 Code blocks

                Yes, you can input code blocks directly in your pages, and they will be rendered using PrismJS.

                ~~~graphql
                query {
                  look(at: "this") {
                    thing
                  }
                }
                ~~~
              `,
            },
            {
              title: 'Blockquote',
              content: markdown`
                # ⚠️ Blockquotes

                Your can show error, warning and info blockquotes.

                > Info: You like info? There you go. **They support inner markdown**!

                > Warning: You like warnings too? Well here's one.

                > Error: Oops, something happened? 🤷
              `,
            },
            {
              title: 'Tables',
              content: markdown`
                # 📚 Tables

                Tables are supported as well.

                | **Animal** | **Emoji** | **Sound** |
                | ---------- | ---------- | --------- |
                | Dog        | 🐶         | Woof!     |
                | Cat        | 🐱         | Meow!     |
                | Cow        | 🐄         | Moo       |
              `,
            },
          ],
        },
      ],
    },
  },
}
