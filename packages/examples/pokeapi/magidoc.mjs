import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const introspectionResult = fs
.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'schema.json'),
)
.toString()

console.log(introspectionResult.slice(0, 20))
export default {
  introspection: {
    type: 'raw',
    content: introspectionResult,
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
