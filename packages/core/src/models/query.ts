export type GraphQLVariables = {
  readonly [key: string]: unknown
}

export type GraphQLQuery = {
  readonly query: string
  readonly variables: GraphQLVariables
}
