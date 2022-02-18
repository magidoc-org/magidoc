import { buildClientSchema, GraphQLSchema, IntrospectionQuery } from 'graphql'
import schema from './_schema.json'

declare global {
  function getTestSchema(): GraphQLSchema
}

global.getTestSchema = () =>
  buildClientSchema(schema as unknown as IntrospectionQuery)
