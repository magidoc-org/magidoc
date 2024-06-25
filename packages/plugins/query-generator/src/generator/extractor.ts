import { type GraphQLNamedType, type GraphQLType, getNamedType, isListType, isNonNullType } from 'graphql'

export function unwrapType(type: GraphQLType): GraphQLNamedType {
  return getNamedType(type)
}

export function typeToString(type: GraphQLType): string {
  if (isNonNullType(type)) {
    return `${typeToString(type.ofType)}!`
  }

  if (isListType(type)) {
    return `[${typeToString(type.ofType)}]`
  }

  return type.name
}
