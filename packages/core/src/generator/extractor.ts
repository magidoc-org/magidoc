import {
  GraphQLField,
  GraphQLInputType,
  GraphQLType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNamedType,
  isWrappingType,
  getNamedType,
} from 'graphql'
import { GraphQLGenerationError } from './error'

export function unwrapType(type: GraphQLType): GraphQLNamedType {
  return getNamedType(type)
}

export function unwrapOne(type: unknown): GraphQLType | null {
  if (isWrappingType(type)) {
    return type.ofType
  }

  return null
}

export function typeToString(type: GraphQLType): string {
  function unwrapOneOrThrow(type: GraphQLType): GraphQLType {
    const unwrapped = unwrapOne(type)
    if (!unwrapped) {
      throw new GraphQLGenerationError(`Unexpected leaf element '${type.toString()}'`)
    }

    return unwrapped
  }

  switch (type.constructor) {
    case GraphQLInterfaceType:
      return (type as unknown as GraphQLInterfaceType).name
    case GraphQLObjectType:
      return (type as unknown as GraphQLObjectType<unknown, unknown>).name
    case GraphQLScalarType:
      return (type as GraphQLScalarType).name
    case GraphQLEnumType:
      return (type as GraphQLEnumType).name
    case GraphQLUnionType:
      return (type as unknown as GraphQLUnionType).name
    case GraphQLInputObjectType:
      return (type as GraphQLInputObjectType).name
    case GraphQLNonNull:
      return `${typeToString(unwrapOneOrThrow(type))}!`
    case GraphQLList:
      return `[${typeToString(unwrapOneOrThrow(type))}]`
    default:
      throw new Error(
        `this should be unreachable but was reached with type '${type.toString()}'`,
      )
  }
}
