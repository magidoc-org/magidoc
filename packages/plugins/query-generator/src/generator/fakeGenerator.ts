import _ from 'lodash'
import globToRegExp from './utils/globToRegex'

import {
  GeneratorConfig,
  GraphQLFactory,
  NullGenerationStrategy,
} from './config'
import { MissingCustomScalarException } from './error'

import { DEFAULT_FACTORIES } from './defaultFactories'
import { typeToString, unwrapType } from './extractor'
import {
  GraphQLField,
  GraphQLArgument,
  GraphQLInputType,
  GraphQLNamedType,
  isNonNullType,
  isInputObjectType,
  isEnumType,
  isScalarType,
  isListType,
  isNullableType,
} from 'graphql'
import type { GenerationContext } from './queryGenerator'
import type { Parameter } from './queryBuilder'

type FakeGenerationContext = GenerationContext & {
  readonly targetName: string
  readonly defaultValue: unknown
  readonly generatedInputObjects: Set<string>
}

export function generateArgsForField(
  field: GraphQLField<unknown, unknown, unknown>,
  config: GeneratorConfig,
  context: GenerationContext,
): ReadonlyArray<Parameter> {
  return field.args.map((argument) =>
    generateInputParameter(argument, config, context),
  )
}

function generateInputParameter(
  input: GraphQLArgument,
  config: GeneratorConfig,
  context: GenerationContext,
): Parameter {
  return {
    name: input.name,
    type: typeToString(input.type),
    value: generateInput(input.type, config, {
      ...context,
      generatedInputObjects: new Set(),
      path: `${context.path}$`,
      defaultValue: input.defaultValue,
      targetName: input.name,
    }),
  }
}

function generateInput(
  input: GraphQLInputType,
  config: GeneratorConfig,
  context: FakeGenerationContext,
): unknown {
  // If you have a field [String!]!, this returns the factory for the string.
  const unwrappedType = unwrapType(input)
  const defaultFactory = unwrappedType.name
    ? DEFAULT_FACTORIES[unwrappedType.name]
    : undefined

  if (isInputObjectType(unwrappedType)) {
    if (
      context.generatedInputObjects.has(unwrappedType.name) &&
      isNullableType(input)
    ) {
      return null
    } else {
      // This is slightly unsafe, because with recursion,
      // it's possible we end up doing a stack-overflow if recursive fields point to each other deeply.
      // However, an infinitely recursive input field would result in an invalid GraphQL schema
      // and an error would be thrown by GraphQL.js when parsing the schema.
      context.generatedInputObjects.add(unwrappedType.name)
    }
  }

  const path = `${context.path}${context.path.endsWith('$') ? '' : '.'}${
    context.targetName
  }`
  const factoryContext = {
    targetName: context.targetName,
    path,
    defaultValue: context.defaultValue,
    depth: context.depth,
  }

  const factory = findMostSpecificFactory(
    input,
    config,
    context,
  )({
    ...factoryContext,
    defaultFactory: defaultFactory
      ? {
          provide: () => defaultFactory(factoryContext),
        }
      : undefined,
    randomFactory: {
      provide: () => {
        return randomFactory(unwrappedType, config, context)(factoryContext)
      },
    },
  })

  return factory
}

function findMostSpecificFactory(
  argumentType: GraphQLInputType,
  config: GeneratorConfig,
  context: FakeGenerationContext,
  nullable = true,
): GraphQLFactory {
  // Did the user provide a factory for this exact type?
  const factoryDirectType = config.factories[typeToString(argumentType)]
  if (factoryDirectType) {
    return factoryDirectType
  }

  // If not null, we must unwrap and go deeper
  if (isNonNullType(argumentType)) {
    return findMostSpecificFactory(argumentType.ofType, config, context, false)
  }

  // The wrapped type allowed for nullable
  if (
    nullable &&
    (config.nullGenerationStrategy == NullGenerationStrategy.ALWAYS_NULL ||
      (config.nullGenerationStrategy == NullGenerationStrategy.SOMETIMES_NULL &&
        Math.random() > 0.5))
  ) {
    return () => null
  }

  // For a list, we find a factory for its elements
  if (isListType(argumentType)) {
    const listElementFactory = findMostSpecificFactory(
      argumentType.ofType,
      config,
      context,
    )
    return (context) => [listElementFactory(context)]
  }

  const unwrappedArgumentType = unwrapType(argumentType)

  // Factory that matches by wildcard
  const wildCardFactory = findWildCardFactory(
    unwrappedArgumentType.name,
    config,
  )

  if (wildCardFactory) {
    return wildCardFactory
  }

  return randomFactory(unwrappedArgumentType, config, context)
}

function randomFactory(
  argumentType: GraphQLNamedType,
  config: GeneratorConfig,
  context: FakeGenerationContext,
): GraphQLFactory {
  if (isEnumType(argumentType)) {
    return () => argumentType.getValues()[0].value as unknown
  }

  if (isScalarType(argumentType)) {
    const defaultFactory = DEFAULT_FACTORIES[argumentType.name]

    if (defaultFactory === undefined) {
      throw new MissingCustomScalarException(
        argumentType,
        `
Cannot generate a random value for scalar '${argumentType.name}'. 
The random generator is not able to randomly generate a value for non-standard GraphQL scalars. 
You have to provide a custom factory by providing this in your config:
{
  '${argumentType.name}': () => generateRandomCustomScalar()
}`,
      )
    }

    return defaultFactory
  }

  if (isInputObjectType(argumentType)) {
    const fields = argumentType.getFields() || {}

    // Generates a random object the required fields in the object
    return () => {
      return _.mapValues(fields, (input) => {
        return generateInput(input.type, config, {
          ...context,
          targetName: input.name,
          defaultValue: input.defaultValue,
        })
      })
    }
  }

  throw new Error(
    `this portion of the fake generator should be unreachable... if you ever see this error, please open an issue: ${argumentType.toJSON()}`,
  )
}
function findWildCardFactory(
  name: string,
  config: GeneratorConfig,
): GraphQLFactory | undefined {
  const matchingKey = Object.keys(config.factories).find((key) =>
    globToRegExp(key).test(name),
  )

  if (matchingKey) {
    return config.factories[matchingKey]
  }

  return undefined
}
