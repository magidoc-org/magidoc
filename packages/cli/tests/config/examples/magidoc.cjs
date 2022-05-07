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

module.exports = config
