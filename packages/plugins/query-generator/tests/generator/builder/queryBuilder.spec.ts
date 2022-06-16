import minify from 'graphql-query-compress'
import { gql, prettify } from '../../src/formatter/query'
import {
  mutationBuilder,
  queryBuilder,
  subSelectionBuilder,
} from '../../src/generator/builder/queryBuilder'

describe('building a query', () => {
  const underTest = queryBuilder()

  describe('generating the query with no fields', () => {
    it('should raise an error', () => {
      expect(() => underTest.build()).toThrowError()
    })
  })

  describe('adding fields to builder', () => {
    it('should not modify the original object', () => {
      expect(underTest.withField('name', [])).not.toBe(underTest)
    })

    describe('naming the query', () => {
      const result = underTest.withField('field', []).withName('Test').build()

      it('should add the name to the query', () => {
        assertGraphQLQueryEqual(
          result.query,
          gql`
            query Test {
              field
            }
          `,
        )
      })
    })

    describe('field has no arguments and no sub-selection', () => {
      const result = underTest.withField('field', []).build()

      it('should generate the right request', () => {
        assertGraphQLQueryEqual(
          result.query,
          gql`
            query {
              field
            }
          `,
        )
      })

      it('should have no arguments', () => {
        expect(result.variables).toEqual({})
      })
    })

    describe('field has arguments and no sub-selection', () => {
      const result = underTest
        .withField('field', [
          {
            name: 'vegetable',
            type: 'VegetableInput',
            value: {
              name: 'Potato',
              bestVegetableInTheWorld: true,
            },
          },
          {
            name: 'name',
            type: 'String!',
            value: 'Raw veggies',
          },
        ])
        .build()

      it('should generate the right request', () => {
        assertGraphQLQueryEqual(
          result.query,
          gql`
            query ($vegetable: VegetableInput, $name: String!) {
              field(vegetable: $vegetable, name: $name)
            }
          `,
        )
      })

      it('should set the variables', () => {
        expect(result.variables).toEqual({
          vegetable: {
            name: 'Potato',
            bestVegetableInTheWorld: true,
          },
          name: 'Raw veggies',
        })
      })
    })

    describe('adding multiple fields with sub-selection and arguments', () => {
      const result = underTest
        .withField('field', [
          {
            name: 'vegetable',
            type: 'VegetableInput',
            value: {
              name: 'Potato',
              bestVegetableInTheWorld: true,
            },
          },
          {
            name: 'name',
            type: 'String!',
            value: 'Raw veggies',
          },
        ])
        .withField(
          'nestedField',
          [
            {
              name: 'nestedArgument',
              type: 'String',
              value: null,
            },
          ],
          subSelectionBuilder().withField(
            'firstLevel',
            [],
            subSelectionBuilder().withField('secondLevel', [
              {
                name: 'secondLevelArgument',
                type: 'Int!',
                value: 234,
              },
            ]),
          ),
        )
        .build()

      it('should generate the right request', () => {
        assertGraphQLQueryEqual(
          result.query,
          gql`
            query (
              $vegetable: VegetableInput
              $name: String!
              $nestedArgument: String
              $secondLevelArgument: Int!
            ) {
              field(vegetable: $vegetable, name: $name)
              nestedField(nestedArgument: $nestedArgument) {
                firstLevel {
                  secondLevel(secondLevelArgument: $secondLevelArgument)
                }
              }
            }
          `,
        )
      })

      it('should set the variables', () => {
        expect(result.variables).toEqual({
          vegetable: {
            name: 'Potato',
            bestVegetableInTheWorld: true,
          },
          name: 'Raw veggies',
          nestedArgument: null,
          secondLevelArgument: 234,
        })
      })
    })

    describe('sub selection is empty for field', () => {
      const builder = underTest.withField('field', [], subSelectionBuilder())

      it('should generate the right request', () => {
        expect(() => builder.build()).toThrowError()
      })
    })

    describe('the same variable name is present two times on two different fields', () => {
      const result = underTest
        .withField('first', [
          {
            name: 'arg',
            type: 'String!',
            value: 'value',
          },
        ])
        .withField('second', [
          {
            name: 'arg',
            type: 'Int!',
            value: 2,
          },
        ])
        .withField(
          'thirdNested',
          [],
          subSelectionBuilder()
            .withField(
              'firstLevel',
              [],
              subSelectionBuilder().withField('thirdField', [
                {
                  name: 'arg',
                  type: 'Boolean!',
                  value: true,
                },
              ]),
            )
            .withField(
              'secondFirstLevel',
              [],
              subSelectionBuilder().withField('thirdField', [
                {
                  name: 'arg',
                  type: 'Boolean!',
                  value: false,
                },
              ]),
            ),
        )
        .build()

      it('should generate a request that handle the duplicate variable names', () => {
        assertGraphQLQueryEqual(
          result.query,
          gql`
            query (
              $arg: String!
              $arg2: Int!
              $arg3: Boolean!
              $arg4: Boolean!
            ) {
              first(arg: $arg)
              second(arg: $arg2)
              thirdNested {
                firstLevel {
                  thirdField(arg: $arg3)
                }
                secondFirstLevel {
                  thirdField(arg: $arg4)
                }
              }
            }
          `,
        )
      })

      it('should map variables correctly', () => {
        expect(result.variables).toEqual({
          arg: 'value',
          arg2: 2,
          arg3: true,
          arg4: false,
        })
      })
    })
  })
})

describe('building a mutation', () => {
  const result = mutationBuilder()
    .withField(
      'vegetables',
      [],
      subSelectionBuilder().withField('update', [
        {
          name: 'name',
          type: 'String!',
          value: 'New name',
        },
      ]),
    )
    .build()

  it('should generate a mutation query', () => {
    assertGraphQLQueryEqual(
      result.query,
      gql`
        mutation ($name: String!) {
          vegetables {
            update(name: $name)
          }
        }
      `,
    )
  })

  it('should set the variables', () => {
    expect(result.variables).toEqual({
      name: 'New name',
    })
  })
})

function assertGraphQLQueryEqual(actual: string, expected: string) {
  expect(prettify(minify(actual))).toEqual(prettify(minify(expected)))
}
