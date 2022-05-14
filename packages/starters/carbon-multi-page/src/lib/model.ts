import {
  buildClientSchema,
  type GraphQLSchema,
  type IntrospectionQuery,
} from 'graphql'
import schemaJson from '../_schema.json'

export const schema: GraphQLSchema = buildClientSchema(
  schemaJson as unknown as IntrospectionQuery,
)
