import type { GraphQLField } from 'graphql'
import {
  generateGraphQLQuery,
  generateGraphQLResponse,
  QueryGeneratorConfig,
  GraphQLFactoryContext,
  NullGenerationStrategy,
  QueryType,
} from '../../src'
import minify from 'graphql-query-compress'
import { gql, prettify } from '../../src/formatter/query'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'
import type {
  FakeGenerationConfig,
  ResponseGenerationConfig,
} from '../../src/generator/config'

const schema = getTestSchema()

describe('generating a query', () => {
  const emptyConfig: Partial<QueryGeneratorConfig> = {}

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
          delay: 42,
          delay2: 42,
          delay3: 42,
          delay4: 42,
        })
      })
    })

    describe('with custom config for max depth', () => {
      describe('and max depth is high enough for the object', () => {
        const config: Partial<QueryGeneratorConfig> = {
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
            delay: 42,
            delay2: 42,
          })
        })
      })

      describe('and the max depth is too low for the object', () => {
        const config: Partial<QueryGeneratorConfig> = {
          maxDepth: 1,
        }

        it('returns a null query', () => {
          expect(generateGraphQLQuery(recursiveField, config)).toBeNull()
        })
      })
    })

    describe('with custom config for null generation', () => {
      const config: Partial<QueryGeneratorConfig> = {
        nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
      }

      it('generates the query up to the configured max depth', () => {
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
          delay: null,
          delay2: null,
          delay3: null,
          delay4: null,
        })
      })
    })

    describe('with a custom factory', () => {
      const config: Partial<QueryGeneratorConfig> = {
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

  describe('for a union type field', () => {
    describe('and max depth is appropriate to generate the union', () => {
      const unionTypeField = getQueryField('union')
      it('generates the query properly', () => {
        const result = generateGraphQLQuery(unionTypeField, emptyConfig)
        assertQueryEqual(
          result?.query,
          gql`
            query {
              union {
                __typename
                ... on First {
                  name
                  first {
                    name
                  }
                }
                ... on Second {
                  name
                  second {
                    name
                  }
                }
              }
            }
          `,
        )
      })
    })

    describe('and max depth is too low to generate a union type', () => {
      const unionTypeField = getQueryField('unionTwoLevels')

      it('generates skips generating the union type', () => {
        const result = generateGraphQLQuery(unionTypeField, {
          maxDepth: 2,
        })

        assertQueryEqual(
          result?.query,
          gql`
            query {
              unionTwoLevels {
                __typename
              }
            }
          `,
        )
      })
    })
  })

  describe('a deep field but non recursive', () => {
    const deepNonRecursiveField = getQueryField('deferrable')

    describe('and max depth is larger than the field', () => {
      const config: Partial<QueryGeneratorConfig> = {
        maxDepth: 10,
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
                deferrableSecondLevel {
                  deferrable {
                    normalString
                  }
                }
              }
            }
          `,
        )
      })

      it('provides values for all the variables', () => {
        const result = generateGraphQLQuery(deepNonRecursiveField, config)

        expect(result?.variables).toEqual({
          delay: 42,
        })
      })
    })

    describe('and max depth is too low to return the field', () => {
      const config: Partial<QueryGeneratorConfig> = {
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
          delay: 42,
        })
      })
    })
  })

  describe('with a custom query name', () => {
    const fieldWithNoArgs = getQueryField('id')
    const config: Partial<QueryGeneratorConfig> = {
      queryName: 'GetId',
    }

    it('generates the right query', () => {
      const result = generateGraphQLQuery(fieldWithNoArgs, config)

      assertQueryEqual(
        result?.query,
        gql`
          query GetId {
            id
          }
        `,
      )
    })
  })
})

describe('generating a mutation', () => {
  const mutation = getMutationField('setString')
  const config: Partial<QueryGeneratorConfig> = {
    queryType: QueryType.MUTATION,
  }

  it('generates the mutation properly', () => {
    const result = generateGraphQLQuery(mutation, config)
    assertQueryEqual(
      result?.query,
      gql`
        mutation ($value: String) {
          setString(value: $value)
        }
      `,
    )
  })

  it('generates the variables properly', () => {
    const result = generateGraphQLQuery(mutation, config)
    expect(result?.variables).toEqual({
      value: 'lorem ipsum',
    })
  })
})

describe('generating a subscription', () => {
  const subscription = getSubscriptionField('message')
  const config: Partial<QueryGeneratorConfig> = {
    queryType: QueryType.SUBSCRIPTION,
  }

  it('generates the subscription properly', () => {
    const result = generateGraphQLQuery(subscription, config)
    assertQueryEqual(
      result?.query,
      gql`
        subscription ($delay: Int) {
          message(delay: $delay)
        }
      `,
    )
  })

  it('generates the variables properly', () => {
    const result = generateGraphQLQuery(subscription, config)
    expect(result?.variables).toEqual({
      delay: 42,
    })
  })
})

describe('generating a response', () => {
  const emptyConfig: Partial<FakeGenerationConfig> = {}

  describe('for a field with no arguments', () => {
    const fieldWithNoArgs = getQueryField('id')
    const anyFactoryContext: GraphQLFactoryContext = {
      depth: 0,
      path: '',
      targetName: '',
    }

    it('generates the right response', () => {
      const result = generateGraphQLResponse(fieldWithNoArgs, emptyConfig)

      assertResponseEqual(result, {
        id: DEFAULT_FACTORIES['ID'](anyFactoryContext),
      })
    })
  })

  describe('for a recursive field', () => {
    const recursiveField = getQueryField('person')

    describe('with default config', () => {
      it('generates the query up to the max default depth', () => {
        const result = generateGraphQLResponse(recursiveField, emptyConfig)

        assertResponseEqual(result, {
          person: {
            age: 36,
            friends: [
              {
                age: 36,
                friends: [
                  {
                    age: 36,
                    friends: [
                      {
                        age: 36,
                        name: 'A name',
                      },
                    ],
                    name: 'A name',
                  },
                ],
                name: 'A name',
              },
            ],
            name: 'A name',
          },
        })
      })
    })

    describe('with a custom max depth', () => {
      const maxDepthConfig: Partial<ResponseGenerationConfig> = {
        ...emptyConfig,
        maxDepth: 3,
      }

      it('generates the query up to the provided max depth', () => {
        const result = generateGraphQLResponse(recursiveField, maxDepthConfig)

        assertResponseEqual(result, {
          person: {
            age: 36,
            friends: [
              {
                age: 36,
                name: 'A name',
              },
            ],
            name: 'A name',
          },
        })
      })

      describe('max depth is too low to generate the target response', () => {
        const tooLowMaxDepthConfig: Partial<ResponseGenerationConfig> = {
          ...emptyConfig,
          maxDepth: 1,
        }

        it('returns no result', () => {
          const result = generateGraphQLResponse(
            recursiveField,
            tooLowMaxDepthConfig,
          )
          expect(result).toBeNull()
        })
      })
    })

    describe('with custom config for null generation', () => {
      const config: Partial<FakeGenerationConfig> = {
        nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
      }

      it('generates the response properly', () => {
        const result = generateGraphQLResponse(recursiveField, config)
        assertResponseEqual(result, { person: null })
      })

      it('generates the response properly for a single-level field', () => {
        const singleLevelField = getQueryField('id')
        const result = generateGraphQLResponse(singleLevelField, config)
        assertResponseEqual(result, { id: null })
      })
    })

    describe('with a custom factory', () => {
      const config: Partial<QueryGeneratorConfig> = {
        factories: {
          Int: (context) => {
            return context.depth
          },
        },
      }

      it('generates the response properly', () => {
        const result = generateGraphQLResponse(recursiveField, config)

        assertResponseEqual(result, {
          person: {
            age: 2,
            friends: [
              {
                age: 3,
                friends: [
                  {
                    age: 4,
                    friends: [
                      {
                        age: 5,
                        name: 'A name',
                      },
                    ],
                    name: 'A name',
                  },
                ],
                name: 'A name',
              },
            ],
            name: 'A name',
          },
        })
      })
    })
  })

  describe('for a union type field', () => {
    const unionTypeField = getQueryField('union')
    it('generates the response properly', () => {
      const result = generateGraphQLResponse(unionTypeField, emptyConfig)
      assertResponseEqual(result, {
        union: {
          __typename: 'First',
          first: [{ name: 'A name' }],
          name: 'A name',
        },
      })
    })
  })
})

function assertQueryEqual(actual?: string, expected?: string) {
  expect(prettify(minify(actual ?? ''))).toEqual(
    prettify(minify(expected ?? '')),
  )
}

function assertResponseEqual(actual: unknown, expected: unknown) {
  expect(actual).toEqual(expected)
}

function getQueryField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getQueryType(), name)
}

function getMutationField(
  name: string,
): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getMutationType(), name)
}

function getSubscriptionField(
  name: string,
): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getSubscriptionType(), name)
}
