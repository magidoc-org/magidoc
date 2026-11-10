import { buildSchema, type GraphQLArgument, GraphQLInt } from 'graphql'
import { describe, expect, it } from 'vitest'
import { getDefaultValue } from '../../../src/generator/utils/defaultValue'

describe('getting the default value of an input', () => {
  it('coerces SDL literal defaults', () => {
    const schema = buildSchema('type Query { field(count: Int = 5, name: String, tags: [String!] = ["a"]): Int }')
    const args = schema.getQueryType()?.getFields().field.args ?? []

    expect(args.map(getDefaultValue)).toEqual([5, undefined, ['a']])
  })

  it('falls back to the legacy defaultValue', () => {
    const legacy = { name: 'count', type: GraphQLInt, defaultValue: 7 } as unknown as GraphQLArgument

    expect(getDefaultValue(legacy)).toBe(7)
  })
})
