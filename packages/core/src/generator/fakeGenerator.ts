import _ from 'lodash'
import globToRegExp from 'glob-to-regexp'

import {
  GeneratorConfig,
  GraphQLFactory,
  NullGenerationStrategy,
} from './config'
import { GraphQLGenerationError } from './error'

import { DEFAULT_FACTORIES } from './defaultFactories'
import { typeToString, unwrapType } from './extractor.js'
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
} from 'graphql'
import { GenerationContext } from './queryGenerator'
import { Parameter } from './queryBuilder'

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
    value: generateInput(
      input.type,
      config,
      {
        ...context,
        path: `${context.path}$`,
      },
      input.defaultValue,
    ),
  }
}

function generateInput(
  input: GraphQLInputType,
  config: GeneratorConfig,
  context: GenerationContext,
  defaultValue: unknown = undefined,
): unknown {
  // If you have a field [String!]!, this returns the factory for the string.
  const unwrappedType = unwrapType(input)
  const defaultFactory = unwrappedType.name
    ? DEFAULT_FACTORIES[unwrappedType.name]
    : undefined

  const factoryContext = {
    targetName: unwrappedType.name,
    defaultValue: defaultValue,
    depth: context.depth,
    path: `${context.path}${context.path.endsWith('$') ? '' : '.'}${
      unwrappedType.name
    }`,
  }

  return findMostSpecificFactory(
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
}

function findMostSpecificFactory(
  argumentType: GraphQLInputType,
  config: GeneratorConfig,
  context: GenerationContext,
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

  // Factory that matches by wildcard
  return randomFactory(unwrappedArgumentType, config, context)
}

function randomFactory(
  argumentType: GraphQLNamedType,
  config: GeneratorConfig,
  context: GenerationContext,
): GraphQLFactory {
  if (isEnumType(argumentType)) {
    return () => _.sample(argumentType.getValues())?.name
  }

  if (isScalarType(argumentType)) {
    const defaultFactory = DEFAULT_FACTORIES[argumentType.name]

    if (defaultFactory === undefined) {
      throw new GraphQLGenerationError(`
        Cannot generate a random value for scalar '${argumentType.name}'. 
        The random generator is not able to randomly generate a value for non-standard GraphQL scalars. 
        You have to provide a custom factory by providing this in your config:
        {
          '${argumentType.name}': () => generateRandomCustomScalar()
        }
    `)
    }

    return defaultFactory
  }

  if (isInputObjectType(argumentType)) {
    const fields = argumentType.getFields() || {}

    // Generates a random object the required fields in the object
    return () => {
      return _.mapValues(fields, (input: GraphQLInputType) => {
        return generateInput(input, config, context)
      })
    }
  }

  throw new Error('this should be unreachable')
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
