export default {
  introspection: {
    type: 'url',
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'PokéAPI',
      appLogo:
        'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg?sanitize=true',
    },
  },
}
