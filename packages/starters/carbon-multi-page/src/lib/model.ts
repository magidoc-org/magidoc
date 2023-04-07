import {
  buildClientSchema,
  buildSchema,
  GraphQLDirective,
  GraphQLInterfaceType,
  GraphQLObjectType,
  isObjectType,
  type GraphQLArgument,
  type GraphQLField,
  type GraphQLNamedType,
  type GraphQLSchema,
  type IntrospectionQuery,
} from 'graphql'
import _ from 'lodash'
import schemaRaw from '../_schema.graphqls?raw'
import {
  createReverseMapping,
  type TypeReverseMapping,
} from '@magidoc/plugin-reverse-schema-mapper'
import { getOrDefault } from './variables'
import {
  templates,
  type AllowedDirective,
} from '@magidoc/plugin-starter-variables'

export const schema: GraphQLSchema = parseSchema()

const allowedDirectives = getOrDefault(templates.DIRECTIVES, [])
const queriesByName = toIgnoreCase(schema.getQueryType()?.getFields())
const mutationsByName = toIgnoreCase(schema.getMutationType()?.getFields())
const subscriptionsByName = toIgnoreCase(
  schema.getSubscriptionType()?.getFields(),
)
const directivesByName = _.keyBy(getAllowedDirectives(), (item) =>
  item.name.toLocaleLowerCase(),
)

const allowedArgumentsByDirectiveName: Record<
  string,
  ReadonlyArray<GraphQLArgument>
> = _.mapValues(directivesByName, (directive) => {
  const found: AllowedDirective | undefined = allowedDirectives.find(
    (item) => item?.name === directive.name || item?.name === '*',
  )
  if (!found) return []
  if (found.args.some((item) => item === '*')) return directive.args
  return found.args
    .map((item) => directive.args.find((arg) => arg.name === item))
    .filter((item): item is GraphQLArgument => !!item)
})

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

export function isModelEmpty(): boolean {
  // By default graphql creates a few types that are not useful for the documentation.
  return _.size(schema.getTypeMap()) <= 10
}

export function hasQueries(): boolean {
  return !!schema.getQueryType()
}

export function getQueryByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return queriesByName[name.toLocaleLowerCase()]
}

export function hasMutations(): boolean {
  return !!schema.getMutationType()
}

export function getMutationByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return mutationsByName[name.toLocaleLowerCase()]
}

export function hasSubscriptions(): boolean {
  return !!schema.getSubscriptionType()
}

export function getSubscriptionByName(
  name: string,
): GraphQLField<unknown, unknown, unknown> | undefined {
  return subscriptionsByName[name.toLocaleLowerCase()]
}

export function getTypeByName(name: string): GraphQLNamedType | undefined {
  return typesByName[name.toLocaleLowerCase()]
}

export function getDirectiveByName(name: string): GraphQLDirective | undefined {
  return directivesByName[name.toLocaleLowerCase()]
}

export function isAllowedDirective(directive: GraphQLDirective): boolean {
  return getDirectiveByName(directive.name) !== undefined
}

export function hasAllowedDirectives(): boolean {
  return _.size(directivesByName) > 0
}

export function getAllowedArgumentsByDirective(
  directive: GraphQLDirective,
): ReadonlyArray<GraphQLArgument> {
  return (
    allowedArgumentsByDirectiveName[directive.name.toLocaleLowerCase()] || []
  )
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

export function getAllowedDirectives() {
  if (allowedDirectives.some((directive) => directive?.name === '*')) {
    return schema.getDirectives().filter(
      (directive) =>
        // Built-in directives that don't need documentation.
        !['include', 'skip', 'deprecated', 'specifiedBy'].includes(
          directive.name,
        ),
    )
  }

  return allowedDirectives
    .filter((directive): directive is AllowedDirective => !!directive?.name)
    .map(({ name }) => (name ? schema.getDirective(name) : undefined))
    .filter((directive): directive is GraphQLDirective => !!directive)
}

function parseSchema() {
  if (schemaRaw.trim().length === 0) {
    // Hack to generate an empty schema
    return buildClientSchema(
      JSON.parse(
        JSON.stringify({ __schema: { types: [] } }),
      ) as IntrospectionQuery,
    )
  }

  return buildSchema(schemaRaw)
}
