import {
  GraphQLField,
  GraphQLInputType,
  GraphQLType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNamedType,
  isListType,
  isWrappingType,
  isNonNullType,
  getNamedType,
} from 'graphql'
import { GraphQLIntrospectionResultError } from './error'

export function unwrapFieldType(
  field: GraphQLField<any, any, any>,
): GraphQLType {
  return unwrapType(field.type)
}

export function unwrapInputValueType(input: GraphQLInputType): GraphQLType {
  return unwrapType(input)
}

export function unwrapNonNull(type: GraphQLType): GraphQLType {
  if (isNonNullType(type)) {
    return type.ofType
  }

  return type
}

export function unwrapList(type: GraphQLType): GraphQLType {
  if (isListType(type)) {
    return type.ofType
  }

  return type
}

export function unwrapType(type: GraphQLType): GraphQLNamedType {
  return getNamedType(type)
}

export function unwrapOne(type: unknown) {
  if (isWrappingType(type)) {
    return type.ofType
  }

  return null
}

export function typeToString(type: GraphQLInputType): string {
  function unwrapOne(type: GraphQLInputType): GraphQLInputType {
    const unwrapped = unwrapOne(type)
    if (!unwrapped) {
      throw createIntrospectionError(`Unexpected leaf element '${typeof type}'`)
    }

    return unwrapped
  }

  switch (type.constructor) {
    case GraphQLInterfaceType:
      return (type as unknown as GraphQLInterfaceType).name
    case GraphQLObjectType:
      return (type as unknown as GraphQLObjectType<any, any>).name
    case GraphQLScalarType:
      return (type as GraphQLScalarType).name
    case GraphQLEnumType:
      return (type as GraphQLEnumType).name
    case GraphQLUnionType:
      return (type as unknown as GraphQLUnionType).name
    case GraphQLNonNull:
      return `${typeToString(unwrapOne(type))}!`
    case GraphQLList:
      return `[${typeToString(unwrapOne(type))}]`
    default:
      throw new Error(
        `this should be unreachable but was reached with type ${typeof type}`,
      )
  }
}

export function createIntrospectionError(
  message: string,
): GraphQLIntrospectionResultError {
  return new GraphQLIntrospectionResultError(
    `
        ${message}
        ${thisIsNotSupposedToHappen()}
      `.trimStart(),
  )
}

function thisIsNotSupposedToHappen(): string {
  return `
        This is not supposed to happen in any valid GraphQL server implementation...
    `
}
