/**
 * @type {import("../../../src").MagidocConfiguration}
 */
const config = {
  introspection: {
    type: 'url',
    headers: {
      Authorization: 'something',
    },
  },
  website: {
    template: 'carbon-multi-page',
  },
}

export default config
