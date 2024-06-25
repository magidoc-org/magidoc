import type { MarkdownOptions } from '@magidoc/plugin-fuse-markdown'
import {
  type GraphQLEnumType,
  type GraphQLInputObjectType,
  type GraphQLInterfaceType,
  type GraphQLNamedType,
  type GraphQLObjectType,
  type GraphQLScalarType,
  type GraphQLUnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
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

export function asTypeSearchResult(type: GraphQLNamedType, options: MarkdownOptions): TypeSearchResult {
  if (isEnumType(type)) return asEnumSearchResult(type, options)
  if (isObjectType(type)) return asObjectSearchResult(GraphQLType.OBJECT, type, options)
  if (isInterfaceType(type)) return asObjectSearchResult(GraphQLType.INTERFACE, type, options)
  if (isScalarType(type)) return asScalarSearchResult(type, options)
  if (isUnionType(type)) return asUnionSearchResult(type, options)
  if (isInputObjectType(type)) return asInputObjectType(type, options)

  throw new Error(
    'This code block should be unreachable. If you ever receive this exception, it means you have an invalid setup using GraphQL.',
  )
}

function asInputObjectType(target: GraphQLInputObjectType, options: MarkdownOptions): InputObjectSearchResult {
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
function asUnionSearchResult(target: GraphQLUnionType, options: MarkdownOptions): UnionSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.UNION,
    name: target.name,
    description: getDescription(target, options),
  }
}
function asScalarSearchResult(target: GraphQLScalarType, options: MarkdownOptions): ScalarSearchResult {
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

function asEnumSearchResult(target: GraphQLEnumType, options: MarkdownOptions): EnumSearchResult {
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
