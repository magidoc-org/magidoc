import prettierGraphql from 'prettier/plugins/graphql'
import prettier from 'prettier/standalone'

/**
 * Simple utility, because many libraries will recognize strings templated with gql`...`
 *
 * @param chunks the GraphQL query
 * @returns the input
 */
export function gql(chunks: TemplateStringsArray): string {
  return chunks.raw.join('')
}

/**
 * Prettifies a GraphQL request
 *
 * @param request A raw GraphQL request
 * @returns a prettified query
 */
export function prettify(request: string): Promise<string> {
  return prettier.format(request, {
    parser: 'graphql',
    plugins: [prettierGraphql],
    tabWidth: 2,
  })
}
