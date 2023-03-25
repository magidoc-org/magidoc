import {
  buildClientSchema,
  type GraphQLField,
  GraphQLObjectType,
  GraphQLSchema,
  type IntrospectionQuery,
} from 'graphql'
import type { Maybe } from 'graphql/jsutils/Maybe'
import schema from './schema/_schema.json'
import recursiveSchema from './schema/_recursive_schema.json'

declare global {
  function getTestSchema(): GraphQLSchema
  function getRecursiveTestSchema(): GraphQLSchema

  function getMandatoryField(
    type: Maybe<GraphQLObjectType>,
    name: string,
  ): GraphQLField<unknown, unknown, unknown>
}

global.getTestSchema = () => {
  return buildClientSchema(schema as unknown as IntrospectionQuery)
}

global.getRecursiveTestSchema = () => {
  return buildClientSchema(recursiveSchema as unknown as IntrospectionQuery)
}

global.getMandatoryField = (type: Maybe<GraphQLObjectType>, name: string) => {
  const result = type?.getFields()[name]

  if (!result) {
    fail(`field ${name} should not be null... did you modify the test schema?`)
  }

  return result
}
