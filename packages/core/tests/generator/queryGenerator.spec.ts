import { GraphQLField } from 'graphql'
import { generateGraphQLQuery, GeneratorConfig, gql, prettify } from '../../src'
import minify from 'graphql-query-compress'

const schema = getTestSchema()

describe('generating a query', () => {
  const emptyConfig: Partial<GeneratorConfig> = {}

  describe('for a field with no arguments', () => {
    const fieldWithNoArgs = getQueryField('id')

    it('generates the right query', () => {
      const result = generateGraphQLQuery(fieldWithNoArgs, emptyConfig)

      assertQueryEqual(
        result?.query,
        gql`
          query {
            id
          }
        `,
      )
    })

    it('generates empty variables', () => {
      const result = generateGraphQLQuery(fieldWithNoArgs, emptyConfig)
      expect(result?.variables).toEqual({})
    })
  })

  describe('for a recursive field', () => {
    const recursiveField = getQueryField('person')

    describe('with default config', () => {
      it('generates the query up to the max default depth', () => {
        const result = generateGraphQLQuery(recursiveField, emptyConfig)

        assertQueryEqual(
          result?.query,
          gql`
            query ($delay: Int, $delay2: Int, $delay3: Int, $delay4: Int) {
              person {
                name
                age(delay: $delay)
                friends {
                  name
                  age(delay: $delay2)
                  friends {
                    name
                    age(delay: $delay3)
                    friends {
                      name
                      age(delay: $delay4)
                    }
                  }
                }
              }
            }
          `,
        )
      })

      it('provides values for all the variables', () => {
        const result = generateGraphQLQuery(recursiveField, emptyConfig)

        expect(result?.variables).toEqual({
          delay: 20,
          delay2: 20,
          delay3: 20,
          delay4: 20,
        })
      })
    })

    describe('with custom config for max depth', () => {
      describe('and max depth is high enough for the object', () => {
        const config: Partial<GeneratorConfig> = {
          maxDepth: 3,
        }

        it('generates the query up to the configured max depth', () => {
          const result = generateGraphQLQuery(recursiveField, config)

          assertQueryEqual(
            result?.query,
            gql`
              query ($delay: Int, $delay2: Int) {
                person {
                  name
                  age(delay: $delay)
                  friends {
                    name
                    age(delay: $delay2)
                  }
                }
              }
            `,
          )
        })

        it('provides values for all the variables', () => {
          const result = generateGraphQLQuery(recursiveField, config)

          expect(result?.variables).toEqual({
            delay: 20,
            delay2: 20,
          })
        })
      })

      describe('and the max depth is too low for the object', () => {
        const config: Partial<GeneratorConfig> = {
          maxDepth: 1,
        }

        it('returns a null query', () => {
          expect(generateGraphQLQuery(recursiveField, config)).toBeNull()
        })
      })
    })

    describe('with a custom factory', () => {
      const config: Partial<GeneratorConfig> = {
        factories: {
          Int: (context) => {
            return context.depth
          },
        },
      }

      it('generates the query properly', () => {
        const result = generateGraphQLQuery(recursiveField, config)

        assertQueryEqual(
          result?.query,
          gql`
            query ($delay: Int, $delay2: Int, $delay3: Int, $delay4: Int) {
              person {
                name
                age(delay: $delay)
                friends {
                  name
                  age(delay: $delay2)
                  friends {
                    name
                    age(delay: $delay3)
                    friends {
                      name
                      age(delay: $delay4)
                    }
                  }
                }
              }
            }
          `,
        )
      })

      it('provides values for all the variables', () => {
        const result = generateGraphQLQuery(recursiveField, config)

        expect(result?.variables).toEqual({
          delay: 2,
          delay2: 3,
          delay3: 4,
          delay4: 5,
        })
      })
    })
  })

  describe('a deep field but non recursive', () => {
    const deepNonRecursiveField = getQueryField('deferrable')

    describe('and max depth is acceptable to return the field', () => {
      const config: Partial<GeneratorConfig> = {
        maxDepth: 3,
      }

      it('generates the query properly', () => {
        const result = generateGraphQLQuery(deepNonRecursiveField, config)

        assertQueryEqual(
          result?.query,
          gql`
            query ($delay: Int) {
              deferrable {
                normalString
                deferredString(delay: $delay)
              }
            }
          `,
        )
      })

      it('provides values for all the variables', () => {
        const result = generateGraphQLQuery(deepNonRecursiveField, config)

        expect(result?.variables).toEqual({
          delay: 20,
        })
      })
    })

    describe('and max depth is too low to return the field', () => {
      const config: Partial<GeneratorConfig> = {
        maxDepth: 1,
      }

      it('generates the query properly', () => {
        expect(generateGraphQLQuery(deepNonRecursiveField, config)).toBeNull()

        assertQueryEqual(
          result?.query,
          gql`
            query ($delay: Int) {
              deferrable {
                normalString
                deferredString(delay: $delay)
              }
            }
          `,
        )
      })

      it('provides values for all the variables', () => {
        const result = generateGraphQLQuery(deepNonRecursiveField, config)

        expect(result?.variables).toEqual({
          delay: 20,
        })
      })
    })
  })
})

function assertQueryEqual(actual?: string, expected?: string) {
  expect(prettify(minify(actual ?? ''))).toEqual(
    prettify(minify(expected ?? '')),
  )
}
function getQueryField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getQueryType(), name)
}

// function getMutationField(
//   name: string,
// ): GraphQLField<unknown, unknown, unknown> {
//   return getMandatoryField(schema.getMutationType(), name)
// }

// function getSubscriptionField(
//   name: string,
// ): GraphQLField<unknown, unknown, unknown> {
//   return getMandatoryField(schema.getSubscriptionType(), name)
// }
