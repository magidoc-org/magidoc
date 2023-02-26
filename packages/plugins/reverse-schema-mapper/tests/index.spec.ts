import { GraphQLNamedType, GraphQLObjectType } from 'graphql'
import { createReverseMapping } from '../src'
import { ReferenceKind } from '../src/reverseUsage'
import { describe, it, expect } from 'vitest'

const schema = getTestSchema()
const reverse = createReverseMapping(schema)

describe('given schema', () => {
  it('should create a reverse mapping for default types', () => {
    expect(reverse.getFor(getMandatoryType('String'))?.references).toHaveLength(
      17,
    )
    expect(
      reverse.getFor(getMandatoryType('Boolean'))?.references,
    ).toHaveLength(3)
  })

  it('should generate field references', () => {
    const parentType = getMandatoryType('Test')

    const result = reverse.getFor(getMandatoryType('Deferrable'))
    const fieldResult = result?.references?.find(
      (ref) => ref.kind === ReferenceKind.FIELD,
    )
    expect(fieldResult).toEqual({
      kind: ReferenceKind.FIELD,
      parent: parentType,
      by: (parentType as GraphQLObjectType).getFields().deferrable,
    })
  })

  it('should generate argument references', () => {
    const targetField = getMandatoryField(
      schema.getQueryType(),
      'hasCustomScalarArg',
    )
    const result = reverse.getFor(getMandatoryType('SomeCustomScalar'))
    const argResult = result?.references.find(
      (ref) => ref.kind === ReferenceKind.ARGUMENT,
    )

    expect(argResult).toEqual({
      kind: ReferenceKind.ARGUMENT,
      by: targetField.args.find((arg) => arg.name === 'nonStandardScalar'),
      field: targetField,
      type: schema.getQueryType(),
    })
  })

  it('should generate union references', () => {
    const first = getMandatoryType('First')
    const result = reverse.getFor(first)
    const unionResult = result?.references.find(
      (ref) => ref.kind === ReferenceKind.UNION,
    )

    expect(unionResult).toEqual({
      kind: ReferenceKind.UNION,
      by: getMandatoryType('TestUnion'),
    })
  })

  it('should not generate meta type references', () => {
    expect(reverse.getFor(getMandatoryType('__Type'))).toBeUndefined()
  })
})

function getMandatoryType(name: string): GraphQLNamedType {
  const result = schema.getType(name)
  if (!result) {
    throw new Error(
      `expected type '${name}' to exist but did not... did you modify the test schema?`,
    )
  }
  return result
}
