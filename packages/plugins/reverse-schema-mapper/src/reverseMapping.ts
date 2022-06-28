import { GraphQLNamedType } from 'graphql'
import { TypeReverseMapping } from './reverseUsage'

export class ReverseGraphQLSchemaMapping {
  private mapping: Map<string, TypeReverseMapping>

  constructor(mapping: Map<string, TypeReverseMapping>) {
    this.mapping = mapping
  }

  getFor(type: GraphQLNamedType): TypeReverseMapping | undefined {
    return this.mapping.get(type.name)
  }
}
