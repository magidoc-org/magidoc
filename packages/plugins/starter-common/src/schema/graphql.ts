import { AllowedDirective, templates } from '@magidoc/plugin-starter-variables'
import { getOrDefault } from '../pages/variables'
import { buildSchema } from 'graphql'
import { isObjectType, GraphQLDirective } from 'graphql'
import type {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNamedType,
  GraphQLField,
  GraphQLArgument,
  GraphQLInterfaceType,
} from 'graphql'

// Built-in directives that don't need documentation.
const IGNORED_DIRECTIVES = ['include', 'skip', 'deprecated', 'specifiedBy']

export type MagidocGraphQLObject = GraphQLObjectType<unknown, unknown>
export type MagidocGraphQLField = GraphQLField<unknown, unknown, unknown>

export type MagidocGQLSchema = {
  readonly original: GraphQLSchema

  readonly queries: MagidocSubSchema<MagidocGraphQLField>
  readonly mutations: MagidocSubSchema<MagidocGraphQLField>
  readonly subscriptions: MagidocSubSchema<MagidocGraphQLField>
  readonly types: MagidocSubSchema<GraphQLNamedType>
  readonly directives: MagidocSubSchema<GraphQLDirective>

  readonly getFieldsWithPossibleDescriptions: (
    type: GraphQLObjectType | GraphQLInterfaceType,
  ) => ReadonlyArray<FieldWithPossibleDescriptions>
}

export type MagidocSubSchema<T> = {
  readonly list: ReadonlyArray<T>
  readonly findByName: (name: string) => T | undefined
}

export type FieldWithPossibleDescriptions = {
  field: GraphQLField<unknown, unknown, unknown>
  possibleDescriptions: PossibleDescription[]
}

export type PossibleDescription = {
  description: string
  from: GraphQLObjectType | GraphQLInterfaceType
}

export function parseSchema(raw: string): MagidocGQLSchema | null {
  if (raw.length === 0) {
    return null
  }

  return buildMagidocSchema(buildSchema(raw))
}
export function buildMagidocSchema(
  schema: GraphQLSchema,
): MagidocGQLSchema | null {
  if (isEmpty(schema)) {
    return null
  }

  const queries = getFields(schema.getQueryType() || undefined)
  const mutations = getFields(schema.getMutationType() || undefined)
  const subscriptions = getFields(schema.getSubscriptionType() || undefined)

  const directives = computeAllowedDirectives(schema)
  const types = Object.values(schema.getTypeMap()).filter(
    (type) => !type.name.startsWith('__'),
  )

  return {
    original: schema,
    queries: createSubSchema(queries),
    mutations: createSubSchema(mutations),
    subscriptions: createSubSchema(subscriptions),
    types: createSubSchema(types),
    directives: createSubSchema(directives),
    getFieldsWithPossibleDescriptions: (type) => {
      return Object.values(type.getFields()).map((field) => ({
        field,
        possibleDescriptions: getFieldPossibleDescriptions(field, type),
      }))
    },
  }
}

function createSubSchema<T extends { name: string }>(
  target: T[],
): MagidocSubSchema<T> {
  return {
    list: target.sort((a, b) => a.name.localeCompare(b.name)),
    findByName: createIgnoreCaseFinder(target, (item) => item.name),
  }
}
function getFields(object?: MagidocGraphQLObject): MagidocGraphQLField[] {
  if (!object) {
    return []
  }
  return Object.values(object.getFields())
}

function computeAllowedDirectives(schema: GraphQLSchema): GraphQLDirective[] {
  const allowedDirectives = getOrDefault(templates.DIRECTIVES, [])

  if (allowedDirectives.some((directive) => directive?.name === '*')) {
    return schema
      .getDirectives()
      .filter((directive) => !IGNORED_DIRECTIVES.includes(directive.name))
  }

  return allowedDirectives
    .filter((directive): directive is AllowedDirective => !!directive?.name)
    .map((target) =>
      withAllowedArguments(target, schema.getDirective(target.name)),
    )
    .filter((directive): directive is GraphQLDirective => !!directive)
}

function withAllowedArguments(
  target: AllowedDirective,
  directive: GraphQLDirective | undefined | null,
): GraphQLDirective | undefined {
  if (!directive) {
    return undefined
  }

  if (target.args.some((item) => item === '*')) {
    return directive
  }

  return new GraphQLDirective({
    name: directive.name,
    description: directive.description,
    locations: directive.locations,
    args: directive.args
      .filter((arg) => target.args.includes(arg.name))
      .reduce(
        (inc, arg) => ({
          ...inc,
          [arg.name]: arg,
        }),
        {} as Record<string, GraphQLArgument>,
      ),
    isRepeatable: directive.isRepeatable,
    astNode: directive.astNode,
    extensions: directive.extensions,
  })
}

function createIgnoreCaseFinder<T>(
  target: ReadonlyArray<T>,
  extractor: (item: T) => string,
) {
  const map = keyBy(target, (item) => extractor(item).toLocaleLowerCase())
  return (name: string) => map[name.toLocaleLowerCase()]
}

function keyBy<T>(array: ReadonlyArray<T>, key: (item: T) => string) {
  return array.reduce((acc, item) => {
    acc[key(item)] = item
    return acc
  }, {} as Record<string, T>)
}

function isEmpty(schema: GraphQLSchema): boolean {
  return Object.keys(schema.getTypeMap()).length <= 10
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
