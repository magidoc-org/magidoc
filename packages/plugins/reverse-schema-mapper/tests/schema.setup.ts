import {
  buildClientSchema,
  GraphQLField,
  GraphQLObjectType,
  GraphQLSchema,
  IntrospectionQuery,
} from 'graphql'
import { Maybe } from 'graphql/jsutils/Maybe'
import schema from './_schema.json'

declare global {
  function getTestSchema(): GraphQLSchema

  function getMandatoryField(
    type: Maybe<GraphQLObjectType>,
    name: string,
  ): GraphQLField<unknown, unknown, unknown>
}

global.getTestSchema = () =>
  buildClientSchema(schema as unknown as IntrospectionQuery)

global.getMandatoryField = (type: Maybe<GraphQLObjectType>, name: string) => {
  const result = type?.getFields()[name]

  if (!result) {
    throw new Error(
      `field ${name} should not be null... did you modify the test schema?`,
    )
  }

  return result
}
