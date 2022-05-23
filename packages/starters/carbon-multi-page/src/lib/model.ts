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

export const schema: GraphQLSchema = buildClientSchema(
  schemaJson as unknown as IntrospectionQuery,
)

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
      href: joinUrlPaths(base, 'types', type.name),
    })),
  }
}
