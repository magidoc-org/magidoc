import prettierGraphql from 'prettier/parser-graphql'
import prettier from 'prettier/standalone'

export function prettify(request: string): string {
  return prettier.format(request, {
    parser: 'graphql',
    plugins: [prettierGraphql],
    tabWidth: 2,
  })
}
