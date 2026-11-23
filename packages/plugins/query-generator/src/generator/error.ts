import type { GraphQLNamedType } from 'graphql'

export class GraphQLGenerationError extends Error {}

export class InfiniteInputException extends Error {
  type: GraphQLNamedType
  constructor(type: GraphQLNamedType, message: string) {
    super(message)
    this.type = type
  }
}

export class MissingCustomScalarException extends Error {
  type: GraphQLNamedType
  constructor(type: GraphQLNamedType, message: string) {
    super(message)
    this.type = type
  }
}
