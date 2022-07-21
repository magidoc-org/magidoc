import {
  buildClientSchema,
  GraphQLObjectType,
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
import { joinUrlPaths } from '@magidoc/plugin-svelte-carbon-commons'
import {
  createReverseMapping,
  type TypeReverseMapping,
} from '@magidoc/plugin-reverse-schema-mapper'

export const schema: GraphQLSchema = buildClientSchema(
  schemaJson as unknown as IntrospectionQuery,
)

const queriesByName = toIgnoreCase(schema.getQueryType()?.getFields())
const mutationsByName = toIgnoreCase(schema.getMutationType()?.getFields())
const subsciptionsByName = toIgnoreCase(
  schema.getSubscriptionType()?.getFields(),
)
const typesByName = toIgnoreCase(schema.getTypeMap())
const reverseMapping = createReverseMapping(schema)

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
      href: joinUrlPaths(base, title.toLocaleLowerCase(), field.name),
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
      href: joinUrlPaths(base, 'types', type.name),
    })),
  }
}

export function getQueryByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return queriesByName[name.toLocaleLowerCase()]
}

export function getMutationByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return mutationsByName[name.toLocaleLowerCase()]
}

export function getSubscriptionByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return subsciptionsByName[name.toLocaleLowerCase()]
}

export function getTypeByName(name: string): GraphQLNamedType | undefined {
  return typesByName[name.toLocaleLowerCase()]
}

export function getTypeUsages(
  type: GraphQLNamedType | undefined,
): TypeReverseMapping | undefined {
  if (!type) return undefined
  return reverseMapping.getFor(type)
}
