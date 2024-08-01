import { get as getVariable } from '$lib/variables'
import {
  MissingCustomScalarException,
  NullGenerationStrategy,
  type QueryType,
  generateGraphQLQuery,
  generateGraphQLResponse,
} from '@magidoc/plugin-query-generator'
import type { GraphQLQuery } from '@magidoc/plugin-query-generator'
import { templates } from '@magidoc/plugin-starter-variables'
import type { GraphQLField } from 'graphql'
import _ from 'lodash'
import { get, writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const MAX_DEPTH = 8
const MIN_DEPTH = 2
const DEFAULT_DEPTH = 3

export type GeneratedGraphQLQuery = {
  value: GraphQLQuery | null
  response: unknown
  type: QueryType
  field: GraphQLField<unknown, unknown, unknown>
  depth: number
  nullGenerationStrategy: NullGenerationStrategy
}

const currentQuery: Writable<GeneratedGraphQLQuery | null> = writable(null)

const generateQuery = async (expected: {
  field: GraphQLField<unknown, unknown, unknown>
  type: QueryType
  depth: number
  nullGenerationStrategy: NullGenerationStrategy
}): Promise<GeneratedGraphQLQuery> => {
  const context = {
    queryType: expected.type,
    maxDepth: expected.depth,
    nullGenerationStrategy: expected.nullGenerationStrategy,
    factories: _.reduce(
      getVariable(templates.QUERY_GENERATION_FACTORIES),
      // Merge the factories values provided by environment variable.
      (prev, curr, key) => ({
        ...prev,
        [key]: () => curr,
      }),
      {},
    ),
  }

  try {
    const request = await generateGraphQLQuery(expected.field, context)
    const response = generateGraphQLResponse(expected.field, context)

    return {
      value: request ?? null,
      response: response,
      depth: expected.depth,
      field: expected.field,
      type: expected.type,
      nullGenerationStrategy: expected.nullGenerationStrategy,
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

To learn more about how to generate a custom scalar value, see: https://magidoc.js.org/cli/magidoc-configuration#querygenerationfactories
`)
    }
    throw error
  }
}

export const graphqlQuery = {
  subscribe: currentQuery.subscribe,
  increaseDepth: async () => {
    const current = get(currentQuery)
    if (!current) return
    if (current.depth < MAX_DEPTH) {
      const generated = await generateQuery({ ...current, depth: current.depth + 1 })
      currentQuery.set(generated)
    }
  },
  decreaseDepth: async () => {
    const current = get(currentQuery)
    if (!current) return
    if (current.depth > MIN_DEPTH) {
      const generated = await generateQuery({ ...current, depth: current.depth - 1 })
      currentQuery.set(generated)
    }
  },
  toggleNullGenerationStrategy: async () => {
    const current = get(currentQuery)
    if (!current) return
    const generated = await generateQuery({
      ...current,
      nullGenerationStrategy:
        current.nullGenerationStrategy === NullGenerationStrategy.NEVER_NULL
          ? NullGenerationStrategy.ALWAYS_NULL
          : NullGenerationStrategy.NEVER_NULL,
    })
    currentQuery.set(generated)
  },
  setField: async (field: GraphQLField<unknown, unknown, unknown>, type: QueryType) => {
    const generated = await generateQuery({
      field,
      type,
      depth: DEFAULT_DEPTH,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    })

    currentQuery.set(generated)
  },
}
