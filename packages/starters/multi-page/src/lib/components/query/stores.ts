import { writable, Writable } from 'svelte/store'
import {
  generateGraphQLQuery,
  GraphQLQuery,
  NullGenerationStrategy,
  QueryType,
} from '@magidoc/plugin-query-generator'
import type { GraphQLField } from 'graphql'

const MAX_DEPTH = 8
const MIN_DEPTH = 2
const DEFAULT_DEPTH = 3

export type GeneratedGraphQLQuery = GraphQLQuery & {
  type: QueryType
  field: GraphQLField<unknown, unknown, unknown>
  depth: number
}

const currentQuery: Writable<GeneratedGraphQLQuery | null> = writable()

const generateQuery = (expected: {
  field: GraphQLField<unknown, unknown, unknown>
  type: QueryType
  depth: number
}): GeneratedGraphQLQuery | null => {
  const result = generateGraphQLQuery(expected.field, {
    queryType: expected.type,
    maxDepth: expected.depth,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  })

  if (result) {
    return {
      depth: expected.depth,
      query: result.query,
      variables: result.variables,
      field: expected.field,
      type: expected.type,
    }
  }

  return null
}

export const graphqlQuery = {
  subscribe: currentQuery.subscribe,
  increaseDepth: () =>
    currentQuery.update((current) => {
      if (current && current.depth < MAX_DEPTH) {
        return generateQuery({ ...current, depth: current.depth + 1 })
      }

      return current
    }),
  decreaseDepth: () =>
    currentQuery.update((current) => {
      if (current && current.depth > MIN_DEPTH) {
        return generateQuery({ ...current, depth: current.depth - 1 })
      }

      return current
    }),
  setField: (field: GraphQLField<unknown, unknown, unknown>, type: QueryType) =>
    currentQuery.update((current) =>
      generateQuery({ field, type, depth: current?.depth ?? DEFAULT_DEPTH }),
    ),
}
