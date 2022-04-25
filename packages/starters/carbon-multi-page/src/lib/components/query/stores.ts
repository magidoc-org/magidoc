import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import generateGraphQLQuery, {
  NullGenerationStrategy,
  QueryType,
} from '@magidoc/plugin-query-generator'
import { templates } from '@magidoc/plugin-starter-variables'
import type { GraphQLQuery } from '@magidoc/plugin-query-generator'
import type { GraphQLField } from 'graphql'
import _ from 'lodash'

const MAX_DEPTH = 8
const MIN_DEPTH = 2
const DEFAULT_DEPTH = 3

export type GeneratedGraphQLQuery = {
  value: GraphQLQuery | null
  type: QueryType
  field: GraphQLField<unknown, unknown, unknown>
  depth: number
}

const currentQuery: Writable<GeneratedGraphQLQuery> = writable()

const generateQuery = (expected: {
  field: GraphQLField<unknown, unknown, unknown>
  type: QueryType
  depth: number
}): GeneratedGraphQLQuery => {
  const result = generateGraphQLQuery(expected.field, {
    queryType: expected.type,
    maxDepth: expected.depth,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    factories: _.reduce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      templates.QUERY_GENERATION_FACTORIES.vite.get(import.meta.env),
      (prev, curr, key) => ({
        ...prev,
        [key]: () => curr,
      }),
      {},
    ),
  })

  return {
    value: result ?? null,
    depth: expected.depth,
    field: expected.field,
    type: expected.type,
  }
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
    currentQuery.update(() =>
      generateQuery({ field, type, depth: DEFAULT_DEPTH }),
    ),
}
