import { GraphQLNamedType } from 'graphql'

export type ReverseUsage = {
  referencedBy: ReadonlyArray<GraphQLNamedType>
}

export type ReverseInterfaceUsage = ReverseUsage & {
  implementations: ReadonlyArray<GraphQLNamedType>
}

export type ReverseScalarUsage = ReverseUsage

export type ReverseUnionUsage = ReverseUsage

export type ReverseObjectUsage = ReverseUsage

export type ReverseInputObjectUsage = ReverseUsage

export type ReverseEnumObjectUsage = ReverseUsage
