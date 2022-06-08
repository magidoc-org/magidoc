import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import generateGraphQLQuery, {
  MissingCustomScalarException,
  NullGenerationStrategy,
  QueryType,
} from '@magidoc/plugin-query-generator'
import { templates } from '@magidoc/plugin-starter-variables'
import type { GraphQLQuery } from '@magidoc/plugin-query-generator'
import type { GraphQLField } from 'graphql'
import _ from 'lodash'
import { get } from '$lib/variables'

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
  try {
    const result = generateGraphQLQuery(expected.field, {
      queryType: expected.type,
      maxDepth: expected.depth,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
      factories: _.reduce(
        get(templates.QUERY_GENERATION_FACTORIES),
        // Merge the factories values provided by environment variable.
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
  } catch (error) {
    if (error instanceof MissingCustomScalarException) {
      throw new Error(`
Cannot generate a random value for scalar '${error.type.name}'. 
The random generator is not able to randomly generate a value for non-standard GraphQL scalars. 
You have to provide a custom factory by providing this in your magidoc config:
{
  website: {
    options: {
      queryGenerationFactories: {
        '${error.type.name}': '<an-example-of-scalar-value>'
      }
    }
  }
}

To learn more about how to generate a custom scalar value, see: https://magidoc-org.github.io/magidoc/cli/magidoc-configuration#querygenerationfactories
`)
    }
    throw error
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
