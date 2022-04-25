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
    },
  },
}
