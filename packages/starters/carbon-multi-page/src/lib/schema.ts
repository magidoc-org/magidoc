import type {
  GraphQLDirective,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLField,
  GraphQLNamedType,
} from 'graphql'
import _ from 'lodash'
import schemaRaw from '../_schema.graphqls?raw'
import {
  createReverseMapping,
  type TypeReverseMapping,
} from '@magidoc/plugin-reverse-schema-mapper'
import {
  schema as schemaCommon,
  type FieldWithPossibleDescriptions,
} from '@magidoc/plugin-starter-common'

export const schema = schemaCommon.parseSchema(schemaRaw)
const reverseMapping = schema ? createReverseMapping(schema.original) : null

export function hasQueries(): boolean {
  return (schema?.queries?.list?.length || 0) > 0
}

export function getQueryByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return schema?.queries?.findByName(name)
}

export function hasMutations(): boolean {
  return (schema?.mutations?.list?.length || 0) > 0
}

export function getMutationByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return schema?.mutations?.findByName(name)
}

export function hasSubscriptions(): boolean {
  return (schema?.subscriptions?.list?.length || 0) > 0
}

export function getSubscriptionByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return schema?.subscriptions?.findByName(name)
}

export function hasTypes(): boolean {
  return (schema?.types?.list?.length || 0) > 0
}

export function getTypeByName(name: string): GraphQLNamedType | undefined {
  return schema?.types?.findByName(name)
}

export function hasDirectives(): boolean {
  return (schema?.directives?.list?.length || 0) > 0
}

export function getDirectiveByName(name: string): GraphQLDirective | undefined {
  return schema?.directives?.findByName(name)
}

export function getTypeUsages(
  type: GraphQLNamedType | undefined,
): TypeReverseMapping | undefined {
  if (!type) return undefined
  return reverseMapping?.getFor(type)
}

export function getFieldsPossibleDescriptions(
  type: GraphQLObjectType | GraphQLInterfaceType,
): ReadonlyArray<FieldWithPossibleDescriptions> {
  return schema?.getFieldsWithPossibleDescriptions(type) || []
}
