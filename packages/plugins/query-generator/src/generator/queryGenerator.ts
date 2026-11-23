import {
  type GraphQLCompositeType,
  type GraphQLField,
  type GraphQLNamedType,
  type GraphQLObjectType,
  type GraphQLOutputType,
  type GraphQLType,
  isInterfaceType,
  isLeafType,
  isListType,
  isNonNullType,
  isNullableType,
  isObjectType,
  isUnionType,
} from 'graphql'
import _ from 'lodash'
import type { GraphQLQuery } from '../models/query'
import { type Parameter, type QueryBuilder, QueryType, queryBuilder, subSelectionBuilder } from './builder/queryBuilder'
import {
  arrayResponseBuilder,
  fieldResponseBuilder,
  type ResponseFieldValueBuilder,
  subObjectResponseBuilder,
  valueResponseBuilder,
} from './builder/responseBuilder'
import { NullGenerationStrategy, type QueryGeneratorConfig, type ResponseGenerationConfig } from './config'
import { unwrapType } from './extractor'
import { generateArgsForField, generateLeafTypeValue } from './fakeGenerator'

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
  readonly fieldAliases?: ReadonlyMap<string, string>
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

  return await resultBuilder.withType(mergedConfig.queryType).withName(mergedConfig.queryName).build()
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
  name: string = field.name,
): QueryBuilder {
  const parameters: ReadonlyArray<Parameter> = generateArgsForField(field, config, context)

  const type = unwrapType(field.type)
  const isLeafField = isLeafType(type)

  if (isLeafField) {
    // No sub selection is allowed since this is a leaf
    return builder.withField(name, parameters)
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
  return builder.withField(name, parameters, generatedSubSelection)
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
    const unionAliases = findUnionAliases(types)
    const finalBuilderWithAllFields = _.reduce(
      types,
      (memo: QueryBuilder, type: GraphQLObjectType<unknown, unknown>) => {
        const typeSubSelection = generateField(type, config, {
          ...context,
          fieldAliases: unionAliases.get(type.name),
        })

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
  }

  if (isObjectType(type) || isInterfaceType(type)) {
    const builder = subSelectionBuilder()

    const fields = type.getFields()
    const finalBuilderWithAllFields = _.reduce(
      fields,
      (memo: QueryBuilder, field: GraphQLField<unknown, unknown, unknown>) => {
        const alias = context.fieldAliases?.get(field.name)
        return buildField(
          memo,
          field,
          config,
          {
            depth: context.depth,
            path: `${context.path}.${field.name}`,
          },
          alias ? `${alias}: ${field.name}` : field.name,
        )
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

function findUnionAliases(types: ReadonlyArray<GraphQLObjectType>): ReadonlyMap<string, ReadonlyMap<string, string>> {
  const conflictingFields = findConflictingFields(types)
  const takenNames = new Set(types.flatMap((type) => Object.keys(type.getFields())))

  return new Map(
    types.map((type) => {
      const aliases = new Map<string, string>()
      for (const name of Object.keys(type.getFields())) {
        if (conflictingFields.has(name)) {
          const alias = availableName(`${name}${type.name}`, takenNames)
          takenNames.add(alias)
          aliases.set(name, alias)
        }
      }
      return [type.name, aliases]
    }),
  )
}

function availableName(base: string, takenNames: ReadonlySet<string>): string {
  let name = base
  for (let suffix = 2; takenNames.has(name); suffix++) {
    name = `${base}${suffix}`
  }
  return name
}

function findConflictingFields(types: ReadonlyArray<GraphQLObjectType>): ReadonlySet<string> {
  const fieldsByName = _.groupBy(
    types.flatMap((type) => Object.values(type.getFields())),
    (field) => field.name,
  )

  return new Set(
    Object.keys(fieldsByName).filter((name) =>
      fieldsByName[name].some((field, index) =>
        fieldsByName[name].slice(index + 1).some((other) => typesConflict(field.type, other.type, new Set())),
      ),
    ),
  )
}

function typesConflict(first: GraphQLOutputType, second: GraphQLOutputType, visited: Set<string>): boolean {
  if (isListType(first) || isListType(second)) {
    return !isListType(first) || !isListType(second) || typesConflict(first.ofType, second.ofType, visited)
  }

  if (isNonNullType(first) || isNonNullType(second)) {
    return !isNonNullType(first) || !isNonNullType(second) || typesConflict(first.ofType, second.ofType, visited)
  }

  if (first === second) {
    return false
  }

  if (isLeafType(first) || isLeafType(second)) {
    return true
  }

  const key = `${first.name}|${second.name}`
  if (visited.has(key)) {
    return false
  }
  visited.add(key)

  const secondFields = selectableFields(second)
  return selectableFields(first).some((field) =>
    secondFields.some((other) => field.name === other.name && typesConflict(field.type, other.type, visited)),
  )
}

function selectableFields(type: GraphQLCompositeType): ReadonlyArray<GraphQLField<unknown, unknown>> {
  if (isUnionType(type)) {
    return type.getTypes().flatMap((member) => Object.values(member.getFields()))
  }
  return Object.values(type.getFields())
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

  if (isNullableType(type) && config.nullGenerationStrategy === NullGenerationStrategy.ALWAYS_NULL) {
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
    let fieldAliases: ReadonlyMap<string, string> = new Map()

    if (isUnionType(target)) {
      const types = target.getTypes()
      target = types[0]
      fieldAliases = findUnionAliases(types).get(target.name) ?? fieldAliases
      builder = builder.withField('__typename', valueResponseBuilder(target.name))
    }

    const resultBuilder = _.reduce(
      target.getFields(),
      (acc, current) => {
        const subSelection = generateResponse(current.name, current.type, config, {
          ...context,
          parentType: target,
          path: `${context.path}.${current.name}`,
          depth: context.depth + 1,
        })

        if (subSelection === null) {
          return acc
        }

        return acc.withField(fieldAliases.get(current.name) ?? current.name, subSelection)
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
