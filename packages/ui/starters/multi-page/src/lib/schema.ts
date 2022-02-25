import schemaJson from '../../static/_schema.json'
import {
  IntrospectionQuery,
  buildClientSchema,
  GraphQLType,
  isListType,
  isNonNullType,
  isNamedType,
} from 'graphql'
import { readable } from 'svelte/store'

export const schema = readable(
  buildClientSchema(schemaJson as unknown as IntrospectionQuery),
)

export function generateTypeLink(type: GraphQLType): string {
  if (isListType(type)) {
    return `[${generateTypeLink(type.ofType)}]`
  }

  if (isNonNullType(type)) {
    return `${generateTypeLink(type.ofType)}!`
  }

  return `<a href="/model/types/${type.name}">${type.name}</a>`
}
