import {
  GraphQLType,
  GraphQLNamedType,
  isWrappingType,
  getNamedType,
  isNonNullType,
  isListType,
} from 'graphql'

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
  if (isNonNullType(type)) {
    return `${typeToString(type.ofType)}!`
  }

  if (isListType(type)) {
    return `[${typeToString(type.ofType)}]`
  }

  return type.name
}
