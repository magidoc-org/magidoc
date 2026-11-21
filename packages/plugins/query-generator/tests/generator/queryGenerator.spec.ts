import { buildSchema, type GraphQLField, type GraphQLSchema, getVariableValues, parse, validate } from 'graphql'
import minify from 'graphql-query-compress'
import { describe, expect, it } from 'vitest'
import {
  type GraphQLFactoryContext,
  generateGraphQLQuery,
  generateGraphQLResponse,
  NullGenerationStrategy,
  type QueryGeneratorConfig,
  QueryType,
} from '../../src'
import { gql, prettify } from '../../src/formatter/query'
import type { FakeGenerationConfig, ResponseGenerationConfig } from '../../src/generator/config'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'

const schema = getTestSchema()

describe('generating a query', () => {
  const emptyConfig: Partial<QueryGeneratorConfig> = {}

  describe('for a field with no arguments', () => {
    const fieldWithNoArgs = getQueryField('id')

    it('generates the right query', async () => {
      const result = await generateGraphQLQuery(fieldWithNoArgs, emptyConfig)

      await assertQueryEqual(
        result?.query,
        gql`
          query {
            id
          }
        `,
      )
    })

    it('generates empty variables', async () => {
      const result = await generateGraphQLQuery(fieldWithNoArgs, emptyConfig)
      expect(result?.variables).toEqual({})
    })
  })

  describe('for a recursive field', () => {
    const recursiveField = getQueryField('person')

    describe('with default config', () => {
      it('generates the query up to the max default depth', async () => {
        const result = await generateGraphQLQuery(recursiveField, emptyConfig)

        await assertQueryEqual(
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

      it('provides values for all the variables', async () => {
        const result = await generateGraphQLQuery(recursiveField, emptyConfig)

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

        it('generates the query up to the configured max depth', async () => {
          const result = await generateGraphQLQuery(recursiveField, config)

          await assertQueryEqual(
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

        it('provides values for all the variables', async () => {
          const result = await generateGraphQLQuery(recursiveField, config)

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

        it('returns a null query', async () => {
          await expect(generateGraphQLQuery(recursiveField, config)).resolves.toBeNull()
        })
      })
    })

    describe('with custom config for null generation', () => {
      const config: Partial<QueryGeneratorConfig> = {
        nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
      }

      it('generates the query up to the configured max depth', async () => {
        const result = await generateGraphQLQuery(recursiveField, config)

        await assertQueryEqual(
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

      it('provides values for all the variables', async () => {
        const result = await generateGraphQLQuery(recursiveField, config)

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

      it('generates the query properly', async () => {
        const result = await generateGraphQLQuery(recursiveField, config)

        await assertQueryEqual(
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

      it('provides values for all the variables', async () => {
        const result = await generateGraphQLQuery(recursiveField, config)

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
      it('generates the query properly', async () => {
        const result = await generateGraphQLQuery(unionTypeField, emptyConfig)
        await assertQueryEqual(
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

      it('generates skips generating the union type', async () => {
        const result = await generateGraphQLQuery(unionTypeField, {
          maxDepth: 2,
        })

        await assertQueryEqual(
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

      it('generates the query properly', async () => {
        const result = await generateGraphQLQuery(deepNonRecursiveField, config)

        await assertQueryEqual(
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

      it('provides values for all the variables', async () => {
        const result = await generateGraphQLQuery(deepNonRecursiveField, config)

        expect(result?.variables).toEqual({
          delay: 42,
        })
      })
    })

    describe('and max depth is too low to return the field', () => {
      const config: Partial<QueryGeneratorConfig> = {
        maxDepth: 3,
      }

      it('generates the query properly', async () => {
        const result = await generateGraphQLQuery(deepNonRecursiveField, config)

        await assertQueryEqual(
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

      it('provides values for all the variables', async () => {
        const result = await generateGraphQLQuery(deepNonRecursiveField, config)

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

    it('generates the right query', async () => {
      const result = await generateGraphQLQuery(fieldWithNoArgs, config)

      await assertQueryEqual(
        result?.query,
        gql`
          query GetId {
            id
          }
        `,
      )
    })
  })

  describe('for a field with two times the same input object', () => {
    const fieldWithDuplicateInputArg = getQueryField('hasDuplicateInputArg')
    const expectedInput = {
      string: 'string',
      int: 42,
      float: 30.7,
      boolean: true,
      id: '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
      enum: 'RED',
      object: null,
      defaultValueString: 'defaultValueString',
      defaultValueBoolean: true,
      defaultValueInt: 42,
      listString: ['listString'],
      listInt: [42],
      listFloat: [30.7],
      listBoolean: [true],
      listID: ['08a16b83-9094-4e89-8c05-2ccadd5c1c7e'],
      listEnum: ['RED'],
      listObject: null,
    }

    it('provides values for all the variables', async () => {
      const result = await generateGraphQLQuery(fieldWithDuplicateInputArg)

      expect(result?.variables).toEqual({
        arg: {
          firstInput: expectedInput,
          secondInput: expectedInput,
        },
      })
    })
  })
})

describe('generating a mutation', () => {
  const mutation = getMutationField('setString')
  const config: Partial<QueryGeneratorConfig> = {
    queryType: QueryType.MUTATION,
  }

  it('generates the mutation properly', async () => {
    const result = await generateGraphQLQuery(mutation, config)
    await assertQueryEqual(
      result?.query,
      gql`
        mutation ($value: String) {
          setString(value: $value)
        }
      `,
    )
  })

  it('generates the variables properly', async () => {
    const result = await generateGraphQLQuery(mutation, config)
    expect(result?.variables).toEqual({
      value: 'value',
    })
  })
})

describe('generating a subscription', () => {
  const subscription = getSubscriptionField('message')
  const config: Partial<QueryGeneratorConfig> = {
    queryType: QueryType.SUBSCRIPTION,
  }

  it('generates the subscription properly', async () => {
    const result = await generateGraphQLQuery(subscription, config)
    await assertQueryEqual(
      result?.query,
      gql`
        subscription ($delay: Int) {
          message(delay: $delay)
        }
      `,
    )
  })

  it('generates the variables properly', async () => {
    const result = await generateGraphQLQuery(subscription, config)
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
        id: DEFAULT_FACTORIES.ID(anyFactoryContext),
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
          const result = generateGraphQLResponse(recursiveField, tooLowMaxDepthConfig)
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

      it('generates the response properly for a non-null field', () => {
        const nonNullField = getQueryField('nonNullResponse')
        const result = generateGraphQLResponse(nonNullField, config)
        assertResponseEqual(result, { nonNullResponse: ['nonNullResponse'] })
      })
    })

    describe('with a custom factory', () => {
      it('generates the response properly', () => {
        const result = generateGraphQLResponse(recursiveField, {
          factories: {
            Int: (context) => {
              return context.depth
            },
          },
        })

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

      it('works using type property', () => {
        const result = generateGraphQLResponse(recursiveField, {
          maxDepth: 3,
          factories: {
            'Person.name': () => 'John doe',
          },
        })

        assertResponseEqual(result, {
          person: {
            name: 'John doe',
            age: 36,
            friends: [{ name: 'John doe', age: 36 }],
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

describe('generating a valid query', () => {
  const validationSchema = buildSchema(`
    type User {
      id: ID!
      name: String
    }

    type Repo {
      id: Int
      name: String
    }

    union SearchResult = User | Repo

    input Pick @oneOf {
      a: Int
      b: String
    }

    input Filter @oneOf {
      not: Filter
      eq: Int
    }

    type Query {
      search(term: String!): [SearchResult!]!
      pick(choice: Pick!): String
      filter(filter: Filter): String
    }
  `)

  function generateAndValidate(name: string, config: Partial<QueryGeneratorConfig> = {}) {
    return generateAndValidateIn(validationSchema, name, config)
  }

  describe('for a union with conflicting field types', () => {
    it('aliases only the conflicting fields', async () => {
      const result = await generateAndValidate('search')

      await assertQueryEqual(
        result?.query,
        gql`
          query ($term: String!) {
            search(term: $term) {
              __typename
              ... on User {
                idUser: id
                name
              }
              ... on Repo {
                idRepo: id
                name
              }
            }
          }
        `,
      )
    })
  })

  describe('for a oneOf input', () => {
    it.each([
      NullGenerationStrategy.NEVER_NULL,
      NullGenerationStrategy.ALWAYS_NULL,
      NullGenerationStrategy.SOMETIMES_NULL,
    ])('generates exactly one non-null field with %s strategy', async (nullGenerationStrategy) => {
      const result = await generateAndValidate('pick', { nullGenerationStrategy })
      expect(result?.variables).toEqual({ choice: { a: 42 } })
    })

    it('skips recursive fields', async () => {
      const result = await generateAndValidate('filter')
      expect(result?.variables).toEqual({ filter: { eq: 42 } })
    })

    it('prefers a field that has a user factory', async () => {
      const result = await generateAndValidate('pick', { factories: { 'Pick.b': () => 'chosen' } })
      expect(result?.variables).toEqual({ choice: { b: 'chosen' } })
    })

    describe('when every field is recursive', () => {
      const recursiveSchema = buildSchema(`
        input F @oneOf {
          not: F
          and: [F!]
        }

        type Query {
          optional(f: F): String
          required(f: F!): String
        }
      `)

      it('generates null for a nullable input', async () => {
        const result = await generateAndValidateIn(recursiveSchema, 'optional')
        expect(result?.variables).toEqual({ f: null })
      })

      it('throws for a non-null input', async () => {
        await expect(
          generateGraphQLQuery(getMandatoryField(recursiveSchema.getQueryType(), 'required')),
        ).rejects.toThrow("Cannot generate a finite value for the @oneOf input 'F'")
      })
    })
  })

  describe('for the response of a union with conflicting field types', () => {
    it('uses the same aliases as the query', async () => {
      const result = await generateAndValidate('search')
      const response = generateGraphQLResponse(getMandatoryField(validationSchema.getQueryType(), 'search')) as {
        search: Record<string, unknown>[]
      }

      expect(Object.keys(response.search[0])).toEqual(firstMemberResponseNames(result?.query))
      expect(Object.keys(response.search[0])).toEqual(['__typename', 'idUser', 'name'])
    })
  })

  describe('for a union whose alias is already a field', () => {
    const clashSchema = buildSchema(`
      type User {
        id: ID!
        idUser: String
      }

      type Repo {
        id: Int
      }

      union SearchResult = User | Repo

      type Query {
        search: [SearchResult!]!
      }
    `)

    it('suffixes the alias in the query and the response', async () => {
      const result = await generateAndValidateIn(clashSchema, 'search')

      await assertQueryEqual(
        result?.query,
        gql`
          query {
            search {
              __typename
              ... on User {
                idUser2: id
                idUser
              }
              ... on Repo {
                idRepo: id
              }
            }
          }
        `,
      )

      const response = generateGraphQLResponse(getMandatoryField(clashSchema.getQueryType(), 'search')) as {
        search: Record<string, unknown>[]
      }
      expect(Object.keys(response.search[0])).toEqual(firstMemberResponseNames(result?.query))
    })
  })

  describe('for a union with object fields of different types', () => {
    const objectSchema = buildSchema(`
      type UserMeta {
        createdAt: String
      }

      type RepoMeta {
        createdAt: String
        stars: Int
      }

      type UserStats {
        count: Int
      }

      type RepoStats {
        count: String
      }

      type User {
        meta: UserMeta
        stats: UserStats
        tags: [String]
      }

      type Repo {
        meta: RepoMeta
        stats: RepoStats
        tags: [String!]
      }

      union SearchResult = User | Repo

      type Query {
        search: [SearchResult!]!
      }
    `)

    it('aliases only the fields whose responses would conflict', async () => {
      const result = await generateAndValidateIn(objectSchema, 'search')

      await assertQueryEqual(
        result?.query,
        gql`
          query {
            search {
              __typename
              ... on User {
                meta {
                  createdAt
                }
                statsUser: stats {
                  count
                }
                tagsUser: tags
              }
              ... on Repo {
                meta {
                  createdAt
                  stars
                }
                statsRepo: stats {
                  count
                }
                tagsRepo: tags
              }
            }
          }
        `,
      )
    })
  })

  describe('for a union nested in a union member field', () => {
    const nestedSchema = buildSchema(`
      type A {
        value: Int
      }

      type B {
        value: String
      }

      union Inner = A | B

      type User {
        id: ID!
        results: [Inner!]
      }

      type Repo {
        id: Int
      }

      union SearchResult = User | Repo

      type Query {
        search: [SearchResult!]!
      }
    `)

    it('aliases at the member level of each union', async () => {
      const result = await generateAndValidateIn(nestedSchema, 'search')

      await assertQueryEqual(
        result?.query,
        gql`
          query {
            search {
              __typename
              ... on User {
                idUser: id
                results {
                  __typename
                  ... on A {
                    valueA: value
                  }
                  ... on B {
                    valueB: value
                  }
                }
              }
              ... on Repo {
                idRepo: id
              }
            }
          }
        `,
      )
    })
  })
})

async function generateAndValidateIn(
  targetSchema: GraphQLSchema,
  name: string,
  config: Partial<QueryGeneratorConfig> = {},
) {
  const field = getMandatoryField(targetSchema.getQueryType(), name)
  const result = await generateGraphQLQuery(field, config)
  const document = parse(result?.query ?? '')
  const operation = document.definitions[0]
  const variableDefinitions = operation.kind === 'OperationDefinition' ? (operation.variableDefinitions ?? []) : []
  const variableErrors = getVariableValues(targetSchema, variableDefinitions, result?.variables ?? {}).errors ?? []

  expect([...validate(targetSchema, document), ...variableErrors].map((error) => error.message)).toEqual([])
  return result
}

function firstMemberResponseNames(query?: string): string[] {
  const operation = parse(query ?? '').definitions[0]
  const root = operation.kind === 'OperationDefinition' ? operation.selectionSet.selections[0] : undefined
  const selections = root?.kind === 'Field' ? (root.selectionSet?.selections ?? []) : []
  const firstFragment = selections.find((selection) => selection.kind === 'InlineFragment')
  const memberSelections = firstFragment?.kind === 'InlineFragment' ? firstFragment.selectionSet.selections : []

  return [...selections, ...memberSelections].flatMap((selection) =>
    selection.kind === 'Field' ? [selection.alias?.value ?? selection.name.value] : [],
  )
}

async function assertQueryEqual(actual?: string, expected?: string): Promise<void> {
  expect(await prettify(minify(actual ?? ''))).toEqual(await prettify(minify(expected ?? '')))
}

function assertResponseEqual(actual: unknown, expected: unknown) {
  expect(actual).toEqual(expected)
}

function getQueryField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getQueryType(), name)
}

function getMutationField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getMutationType(), name)
}

function getSubscriptionField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getSubscriptionType(), name)
}
