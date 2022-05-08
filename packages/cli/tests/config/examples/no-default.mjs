/**
 * @type {import("../../../src").MagidocConfiguration}
 */
const config = {
  introspection: {
    type: 'url',
    url: 'https://potato.com/graphql',
    headers: {
      Authorization: 'something',
    },
  },
  website: {
    template: 'carbon-multi-page',
  },
}

export { config }
