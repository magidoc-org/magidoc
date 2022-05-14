/**
 * @type {import("../../../src").MagidocConfiguration}
 */
const config = {
  introspection: {
    type: 'url',
    url: 'https://potato.com/graphql',
    headers: {
      Test: 'something',
    },
  },
  website: {
    template: 'carbon-multi-page',
  },
}

export default config
