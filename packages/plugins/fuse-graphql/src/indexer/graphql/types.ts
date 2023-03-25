import type { MarkdownOptions } from '@magidoc/plugin-fuse-markdown'
import {
  type GraphQLNamedType,
  isEnumType,
  isObjectType,
  isInterfaceType,
  isScalarType,
  isUnionType,
  isInputObjectType,
  type GraphQLInputObjectType,
  type GraphQLUnionType,
  type GraphQLScalarType,
  type GraphQLObjectType,
  type GraphQLInterfaceType,
  type GraphQLEnumType,
} from 'graphql'
import {
  type EnumSearchResult,
  GraphQLType,
  type InputObjectSearchResult,
  type InterfaceSearchResult,
  type ObjectSearchResult,
  type ScalarSearchResult,
  SearchResultType,
  type TypeSearchResult,
  type UnionSearchResult,
} from '../result'
import { getDescription } from './description'

export function asTypeSearchResult(
  type: GraphQLNamedType,
  options: MarkdownOptions,
): TypeSearchResult {
  if (isEnumType(type)) {
    return asEnumSearchResult(type, options)
  } else if (isObjectType(type)) {
    return asObjectSearchResult(GraphQLType.OBJECT, type, options)
  } else if (isInterfaceType(type)) {
    return asObjectSearchResult(GraphQLType.INTERFACE, type, options)
  } else if (isScalarType(type)) {
    return asScalarSearchResult(type, options)
  } else if (isUnionType(type)) {
    return asUnionSearchResult(type, options)
  } else if (isInputObjectType(type)) {
    return asInputObjectType(type, options)
  }

  throw new Error(
    'This code block should be unreachable. If you ever receive this exception, it means you have an invalid setup using GraphQL.',
  )
}

function asInputObjectType(
  target: GraphQLInputObjectType,
  options: MarkdownOptions,
): InputObjectSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.INPUT_OBJECT,
    name: target.name,
    description: getDescription(target, options),
    fields: Object.values(target.getFields()).map((field) => ({
      name: field.name,
      description: getDescription(field, options),
    })),
  }
}
function asUnionSearchResult(
  target: GraphQLUnionType,
  options: MarkdownOptions,
): UnionSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.UNION,
    name: target.name,
    description: getDescription(target, options),
  }
}
function asScalarSearchResult(
  target: GraphQLScalarType,
  options: MarkdownOptions,
): ScalarSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.SCALAR,
    name: target.name,
    description: getDescription(target, options),
  }
}
function asObjectSearchResult(
  type: GraphQLType.OBJECT | GraphQLType.INTERFACE,
  target: GraphQLObjectType | GraphQLInterfaceType,
  options: MarkdownOptions,
): ObjectSearchResult | InterfaceSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: type,
    name: target.name,
    description: getDescription(target, options),
    fields: Object.values(target.getFields()).map((field) => ({
      name: field.name,
      description: getDescription(field, options),
      arguments: field.args.map((arg) => ({
        name: arg.name,
        description: getDescription(arg, options),
      })),
    })),
  }
}

function asEnumSearchResult(
  target: GraphQLEnumType,
  options: MarkdownOptions,
): EnumSearchResult {
  return {
    name: target.name,
    description: getDescription(target, options),
    graphqlType: GraphQLType.ENUM,
    type: SearchResultType.TYPE,
    values: target.getValues().map((value) => ({
      value: value.name,
      description: getDescription(value, options),
    })),
  }
}
