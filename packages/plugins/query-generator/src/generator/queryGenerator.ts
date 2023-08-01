import _ from 'lodash'

import type { GraphQLQuery } from '../models/query'
import {
  type QueryGeneratorConfig,
  NullGenerationStrategy,
  type ResponseGenerationConfig,
} from './config'
import {
  type GraphQLField,
  type GraphQLType,
  type GraphQLObjectType,
  isLeafType,
  isUnionType,
  isObjectType,
  isInterfaceType,
  isNonNullType,
  isListType,
  isNullableType,
  type GraphQLNamedType,
} from 'graphql'
import { unwrapType } from './extractor'
import { generateArgsForField, generateLeafTypeValue } from './fakeGenerator'
import {
  type Parameter,
  QueryBuilder,
  queryBuilder,
  QueryType,
  subSelectionBuilder,
} from './builder/queryBuilder'
import {
  fieldResponseBuilder,
  subObjectResponseBuilder,
  valueResponseBuilder,
  type ResponseFieldValueBuilder,
  arrayResponseBuilder,
} from './builder/responseBuilder'

const DEFAULT_CONFIG: QueryGeneratorConfig = {
  queryType: QueryType.QUERY,
  queryName: undefined,
  maxDepth: 5,
  nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  factories: {},
}

export type GenerationContext = {
  readonly path: string
  readonly parentType?: GraphQLNamedType
  readonly depth: number
}

export async function generateGraphQLQuery(
  field: GraphQLField<unknown, unknown, unknown>,
  config?: Partial<QueryGeneratorConfig>,
): Promise<GraphQLQuery | null> {
  const mergedConfig = Object.assign({}, DEFAULT_CONFIG, config)

  const initialBuilder = queryBuilder()

  const resultBuilder = buildField(initialBuilder, field, mergedConfig, {
    depth: 1,
    path: field.name,
  })

  if (resultBuilder === initialBuilder) {
    return null
  }

  return await resultBuilder
    .withType(mergedConfig.queryType)
    .withName(mergedConfig.queryName)
    .build()
}

export function generateGraphQLResponse(
  field: GraphQLField<unknown, unknown, unknown>,
  config?: Partial<ResponseGenerationConfig>,
): unknown {
  const mergedConfig = Object.assign({}, DEFAULT_CONFIG, config)
  const response = generateResponse(field.name, field.type, mergedConfig, {
    depth: 1,
    path: field.name,
  })

  if (response === null) {
    return null
  }

  return fieldResponseBuilder(field, response).build()
}

function buildField(
  builder: QueryBuilder,
  field: GraphQLField<unknown, unknown, unknown>,
  config: QueryGeneratorConfig,
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
  config: QueryGeneratorConfig,
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

  if (isUnionType(type)) {
    const builder = subSelectionBuilder().withField('__typename', [])

    const types = type.getTypes()
    const finalBuilderWithAllFields = _.reduce(
      types,
      (memo: QueryBuilder, type: GraphQLObjectType<unknown, unknown>) => {
        const typeSubSelection = generateField(type, config, context)

        if (typeSubSelection) {
          return memo.withInlineFragment(type.name, typeSubSelection)
        }

        // We were not able to build the fragment due to max depth being reached,
        // so return without the fragment
        return memo
      },
      builder,
    )

    return finalBuilderWithAllFields
  } else if (isObjectType(type) || isInterfaceType(type)) {
    const builder = subSelectionBuilder()

    const fields = type.getFields()
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

  throw new Error(
    `this portion of the query generator should be unreachable... if you ever see this error, please open an issue: ${JSON.stringify(
      type,
    )}`,
  )
}

function generateResponse(
  name: string,
  type: GraphQLType,
  config: ResponseGenerationConfig,
  context: GenerationContext,
): ResponseFieldValueBuilder | null {
  // Go no further
  if (context.depth > config.maxDepth) {
    return null
  }

  if (
    isNullableType(type) &&
    config.nullGenerationStrategy === NullGenerationStrategy.ALWAYS_NULL
  ) {
    return valueResponseBuilder(null)
  }

  if (isNonNullType(type)) {
    type = type.ofType
  }

  if (isLeafType(type)) {
    // No more fields under
    return valueResponseBuilder(
      generateLeafTypeValue(
        name,
        type,
        {
          ...config,
          // We force the leaf type to not be null here,
          // since null generation strategy is handled here for the responses
          nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
        },
        context,
      ),
    )
  }

  if (isListType(type)) {
    const subResult = generateResponse(name, type.ofType, config, context)
    if (!subResult) return null
    return arrayResponseBuilder().withValue(subResult)
  }

  if (isUnionType(type) || isObjectType(type) || isInterfaceType(type)) {
    let builder = subObjectResponseBuilder()
    let target = type

    if (isUnionType(target)) {
      target = target.getTypes()[0]
      builder = builder.withField(
        '__typename',
        valueResponseBuilder(target.name),
      )
    }

    const resultBuilder = _.reduce(
      target.getFields(),
      (acc, current) => {
        const subSelection = generateResponse(
          current.name,
          current.type,
          config,
          {
            ...context,
            parentType: target,
            path: `${context.path}.${current.name}`,
            depth: context.depth + 1,
          },
        )

        if (subSelection === null) {
          return acc
        }

        return acc.withField(current.name, subSelection)
      },
      builder,
    )

    if (resultBuilder === builder) {
      // Could not generate the sub selection, as we reached the max depth
      return null
    }

    return resultBuilder
  }

  throw new Error(
    `this portion of the query generator should be unreachable... if you ever see this error, please open an issue: ${JSON.stringify(
      type,
    )}`,
  )
}
