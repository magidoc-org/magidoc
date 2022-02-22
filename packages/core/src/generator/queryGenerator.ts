import _, { merge } from 'lodash'

import { GraphQLQuery } from '../models/query'
import { GeneratorConfig, NullGenerationStrategy } from './config'
import {
  GraphQLField,
  GraphQLType,
  GraphQLObjectType,
  isLeafType,
} from 'graphql'
import {  unwrapType } from './extractor'
import { generateArgsForField } from './fakeGenerator'
import {
  Parameter,
  QueryBuilder,
  queryBuilder,
  subSelectionBuilder,
} from './queryBuilder'
import { QueryType } from '..'

const DEFAULT_CONFIG: GeneratorConfig = {
  queryName: undefined,
  queryType: QueryType.QUERY,
  maxDepth: 5,
  nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  factories: {},
}

export type GenerationContext = {
  readonly path: string
  readonly depth: number
}

export function generateGraphQLQuery(
  field: GraphQLField<unknown, unknown, unknown>,
  config?: Partial<GeneratorConfig>,
): GraphQLQuery | null {
  const mergedConfig = Object.assign({}, DEFAULT_CONFIG, config)

  const initialBuilder = queryBuilder()

  const resultBuilder = buildField(initialBuilder, field, mergedConfig, {
    depth: 1,
    path: field.name,
  })

  if (resultBuilder === initialBuilder) {
    return null
  }

  return resultBuilder
    .withType(mergedConfig.queryType)
    .withName(mergedConfig.queryName)
    .build()
}

function buildField(
  builder: QueryBuilder,
  field: GraphQLField<unknown, unknown, unknown>,
  config: GeneratorConfig,
  context: GenerationContext,
): QueryBuilder {
  const parameters: ReadonlyArray<Parameter> = generateArgsForField(
    field,
    config,
    context,
  )

  const type = unwrapType(field.type)
  const isLeafField = isLeafType(type)

  if (isLeafField) {
    // No sub selection is allowed since this is a leaf
    return builder.withField(field.name, parameters)
  }

  const generatedSubSelection = generateField(type, config, {
    ...context,
    depth: context.depth + 1,
  })

  if (generatedSubSelection === null) {
    // No new field in the builder, as we can't select any sub field due to max depth
    return builder
  }

  // Modify the builder to select the sub field
  return builder.withField(field.name, parameters, generatedSubSelection)
}

function generateField(
  type: GraphQLType,
  config: GeneratorConfig,
  context: GenerationContext,
): QueryBuilder | null {
  // Go no further
  if (context.depth > config.maxDepth) {
    return null
  }

  if (isLeafType(type)) {
    // No more fields under
    return null
  }

  const builder = subSelectionBuilder()

  const fields = (type as GraphQLObjectType).getFields()
  const finalBuilderWithAllFields = _.reduce(
    fields,
    (memo: QueryBuilder, field: GraphQLField<unknown, unknown, unknown>) => {
      return buildField(memo, field, config, {
        depth: context.depth,
        path: `${context.path}.${field.name}`,
      })
    },
    builder,
  )

  if (finalBuilderWithAllFields === builder) {
    // No change in the builder indicates that there were no leaf elements
    // and that no sub fields could be selected due to max depth being reached
    return null
  }

  return finalBuilderWithAllFields
}
