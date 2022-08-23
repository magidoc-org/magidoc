import type { GraphQLField } from 'graphql'
import type { QuerySearchResult } from '../result'
import type { MarkdownOptions } from '@magidoc/plugin-fuse-markdown'
import { getDescription } from './description'

export function asQueryResult(
  type: QuerySearchResult['type'],
  field: GraphQLField<unknown, unknown>,
  options: MarkdownOptions,
): QuerySearchResult {
  return {
    type: type,
    name: field.name,
    description: getDescription(field, options),
    arguments: field.args.map((arg) => ({
      name: arg.name,
      description: getDescription(arg, options),
    })),
  }
}
