import {
  buildClientSchema,
  GraphQLInterfaceType,
  GraphQLObjectType,
  isObjectType,
  type GraphQLField,
  type GraphQLNamedType,
  type GraphQLSchema,
  type IntrospectionQuery,
} from 'graphql'
import _ from 'lodash'
import type { WebsiteContent } from 'src/app'
import schemaJson from '../_schema.json'
import type { Maybe } from 'graphql/jsutils/Maybe'
import { base } from '$app/paths'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import {
  createReverseMapping,
  type TypeReverseMapping,
} from '@magidoc/plugin-reverse-schema-mapper'

export const schema: GraphQLSchema = buildClientSchema(
  schemaJson as unknown as IntrospectionQuery,
)

const queriesByName = toIgnoreCase(schema.getQueryType()?.getFields())
const mutationsByName = toIgnoreCase(schema.getMutationType()?.getFields())
const subscriptionsByName = toIgnoreCase(
  schema.getSubscriptionType()?.getFields(),
)
const typesByName = toIgnoreCase(schema.getTypeMap())
const reverseMapping = createReverseMapping(schema)

export type FieldWithPossibleDescriptions = {
  field: GraphQLField<unknown, unknown, unknown>
  possibleDescriptions: PossibleDescription[]
}

export type PossibleDescription = {
  description: string
  from: GraphQLObjectType | GraphQLInterfaceType
}

function toIgnoreCase<T>(
  target: Record<string, T> | undefined,
): Record<string, T> {
  return _.mapKeys(target || {}, (_, key) => key.toLocaleLowerCase())
}

export function createModelContent(): ReadonlyArray<WebsiteContent> {
  return [
    createWebsiteContent('Queries', schema.getQueryType()),
    createWebsiteContent('Mutations', schema.getMutationType()),
    createWebsiteContent('Subscriptions', schema.getSubscriptionType()),
    createTypesWebsiteContent(),
  ].filter((content): content is WebsiteContent => !!content)
}

function createWebsiteContent(
  title: string,
  type: Maybe<GraphQLObjectType<unknown, unknown>>,
): WebsiteContent | null {
  return createWebsiteContentFromFields(title, getSortedRootFields(type))
}

function getSortedRootFields(type: Maybe<GraphQLObjectType<unknown, unknown>>) {
  return _.sortBy(type?.getFields() || {}, (item) => item.name)
}

function createWebsiteContentFromFields(
  title: string,
  fields: GraphQLField<unknown, unknown, unknown>[],
): WebsiteContent | null {
  if (fields.length === 0) return null
  return {
    type: 'menu',
    title: title,
    children: fields.map((field) => ({
      type: 'page',
      title: field.name,
      section: title,
      deprecated: !!field.deprecationReason,
      href: urlUtils.joinUrlPaths(base, title.toLocaleLowerCase(), field.name),
    })),
  }
}

function createTypesWebsiteContent(): WebsiteContent | null {
  const types: GraphQLNamedType[] = _.sortBy(
    _.map(schema.getTypeMap()),
    (type) => type.name,
  ).filter((type) => !type.name.startsWith('__'))
  // By default, String and Boolean are included,
  // but there is no documentation to generate if there is only that in the schema
  if (types.length <= 2) return null
  return {
    type: 'menu',
    title: 'Types',
    children: types.map((type) => ({
      type: 'page',
      title: type.name,
      section: 'Types',
      href: urlUtils.joinUrlPaths(base, 'types', type.name),
    })),
  }
}

export function getQueryByName(
  name: string | undefined,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return name ? queriesByName[name.toLocaleLowerCase()] : undefined
}

export function getMutationByName(
  name: string | undefined,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return name ? mutationsByName[name.toLocaleLowerCase()] : undefined
}

export function getSubscriptionByName(
  name: string | undefined,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return name ? subscriptionsByName[name.toLocaleLowerCase()] : undefined
}

export function getTypeByName(name: string | undefined): GraphQLNamedType | undefined {
  return name ? typesByName[name.toLocaleLowerCase()] : undefined
}

export function getTypeUsages(
  type: GraphQLNamedType | undefined,
): TypeReverseMapping | undefined {
  if (!type) return undefined
  return reverseMapping.getFor(type)
}

export function getFieldsPossibleDescriptions(
  type: GraphQLObjectType | GraphQLInterfaceType,
): ReadonlyArray<FieldWithPossibleDescriptions> {
  return _.flatMap(type.getFields(), (field) => ({
    field,
    possibleDescriptions: getFieldPossibleDescriptions(field, type),
  }))
}

function getFieldPossibleDescriptions(
  field: GraphQLField<unknown, unknown, unknown> | undefined,
  owner: GraphQLObjectType | GraphQLInterfaceType,
): PossibleDescription[] {
  if (!field) return []

  if (field.description) {
    return [{ description: field.description, from: owner }]
  }

  if (!isObjectType(owner)) {
    return []
  }

  return owner
    .getInterfaces()
    .flatMap((interfaceType) =>
      getFieldPossibleDescriptions(
        interfaceType.getFields()[field.name],
        interfaceType,
      ),
    )
}
