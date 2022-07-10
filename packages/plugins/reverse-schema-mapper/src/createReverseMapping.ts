import {
  GraphQLArgument,
  GraphQLField,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  isListType,
  isNonNullType,
  isObjectType,
  isUnionType,
} from 'graphql'
import { ReverseGraphQLSchemaMapping } from './reverseMapping'
import { ReferenceKind, TypeReverseMapping } from './reverseUsage'

export function createReverseMapping(
  schema: GraphQLSchema,
): ReverseGraphQLSchemaMapping {
  const mapping = new Map<string, TypeReverseMapping>()

  iterateTypes(schema, (type) => {
    if (isObjectType(type)) {
      iterateFields(type, (field) => {
        const fieldType = unwrap(field.type)
        const target = getOrCreate(mapping, fieldType)
        target.references.push({
          kind: ReferenceKind.FIELD,
          parent: type,
          by: field,
        })

        iterateArguments(field, (argument) => {
          const argumentType = unwrap(argument.type)
          const target = getOrCreate(mapping, argumentType)
          target.references.push({
            kind: ReferenceKind.ARGUMENT,
            field: field,
            type: type,
            by: argument,
          })
        })
      })
    }

    if (isUnionType(type)) {
      type.getTypes().forEach((union) => {
        const target = getOrCreate(mapping, union)
        target.references.push({
          kind: ReferenceKind.UNION,
          by: type,
        })
      })
    }
  })

  return new ReverseGraphQLSchemaMapping(mapping)
}

function iterateTypes(
  schema: GraphQLSchema,
  callback: (type: GraphQLType) => void,
) {
  Object.entries(schema.getTypeMap()).forEach(([, type]) => {
    if (!type.name.startsWith('__')) {
      callback(type)
    }
  })
}

function iterateFields(
  type: GraphQLObjectType,
  callback: (field: GraphQLField<unknown, unknown>) => void,
) {
  Object.entries(type.getFields()).forEach(([, field]) => {
    callback(field)
  })
}

function iterateArguments(
  field: GraphQLField<unknown, unknown, unknown>,
  callback: (argument: GraphQLArgument) => void,
) {
  Object.entries(field.args).forEach(([, arg]) => {
    callback(arg)
  })
}

function getOrCreate(
  mapping: Map<string, TypeReverseMapping>,
  type: GraphQLNamedType,
) {
  let reverseMapping = mapping.get(type.name)
  if (!reverseMapping) {
    reverseMapping = {
      references: [],
    }
    mapping.set(type.name, reverseMapping)
  }
  return reverseMapping
}

function unwrap(type: GraphQLType): GraphQLNamedType {
  if (isNonNullType(type) || isListType(type)) {
    return unwrap(type.ofType)
  }

  return type
}
