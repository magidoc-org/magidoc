import { ReverseUsage } from './reverseUsage'

export class ReverseGraphQLSchemaMapping {
  private mapping: Map<string, ReverseUsage>

  constructor(mapping: Map<string, ReverseUsage>) {
    this.mapping = mapping
  }
}
