import type { GraphQLField, GraphQLObjectType } from 'graphql'
import type { QuerySearchResult, SearchResult } from '../result'
import type { MarkdownOptions } from '@magidoc/fuse-markdown'
import type Fuse from 'fuse.js'
import { getDescription } from './description'

export function indexAllFieldsOf(
  type: QuerySearchResult['type'],
  target: GraphQLObjectType | undefined | null,
  fuse: Fuse<SearchResult>,
  options: MarkdownOptions,
) {
  if (!target) return
  Object.values(target.getFields()).forEach((field) => {
    fuse.add(asQueryResult(type, field, options))
  })
}

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
