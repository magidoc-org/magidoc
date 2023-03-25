import {
  type GraphQLField,
  type GraphQLNamedType,
  GraphQLScalarType,
  isNullableType,
} from 'graphql'
import _ from 'lodash'
import {
  type GenerationContext,
  type GraphQLFactoryContext,
  NullGenerationStrategy,
  type QueryGeneratorConfig,
  QueryType,
} from '../../src'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'
import {
  generateArgsForField,
  generateLeafTypeValue,
} from '../../src/generator/fakeGenerator'
import type { Parameter } from '../../src/generator/builder/queryBuilder'
import type { FakeGenerationConfig } from '../../src/generator/config'
import { describe, test, expect, beforeAll, it, vi } from 'vitest'

const schema = getTestSchema()

describe('generating fakes for a GraphQL input argument', () => {
  const fieldWithArgs = getQueryField('hasArgs')

  const baseConfig: QueryGeneratorConfig = {
    queryType: QueryType.QUERY,
    factories: {},
    maxDepth: 5,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  }

  const context: GenerationContext = {
    depth: 3,
    path: 'some.query.path',
  }

  const allArgNames = fieldWithArgs.args.map((arg) => arg.name)

  beforeAll(() => {
    // Ensure we have elements in there
    expect(allArgNames).toHaveLength(15)
  })

  describe('with never null generation strategy', () => {
    const config: QueryGeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }

    function validateParameterEqualToDefaultFactory(
      name: string,
      result: ReadonlyArray<Parameter>,
    ) {
      const parameter = paramByName(name, result)
      const defaultFactory = _.find(DEFAULT_FACTORIES, (__, key) =>
        name.toLocaleLowerCase().includes(key.toLocaleLowerCase()),
      )
      const defaultValue = defaultFactory
        ? defaultFactory({
            ...context,
            targetName: name.replace('[', '').replace(']', '').replace('!', ''),
          })
        : null

      const isList =
        parameter.type.includes('[') && parameter.type.includes(']')

      if (defaultValue) {
        if (isList) {
          expect(parameter.value).toEqual([defaultValue])
        } else {
          expect(parameter.value).toEqual(defaultValue)
        }
      } else if (isList) {
        expect(parameter.value).toHaveLength(1)
        expect((parameter.value as Array<unknown>)[0]).toBeTruthy()
      } else if (name === 'enum') {
        expect(parameter.value).toBe('RED')
      } else {
        expect(parameter.value).toBeTruthy()
      }
    }

    const result = generateArgsForField(fieldWithArgs, config, context)

    test.each(allArgNames)(
      'should generate the parameter equal to the default factory',
      (arg) => {
        validateParameterEqualToDefaultFactory(arg, result)
      },
    )
  })

  describe('with always null generation strategy', () => {
    const config: QueryGeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
    }

    function validateParameterIsNullIfNullable(
      name: string,
      result: ReadonlyArray<Parameter>,
    ) {
      const parameter = paramByName(name, result)
      const argument = _.find(fieldWithArgs?.args, (arg) => arg.name === name)

      if (!argument) {
        fail(`expected argument to be defined by name '${name}'`)
      }

      if (isNullableType(argument.type)) {
        expect(parameter.value).toBeNull()
      } else {
        expect(parameter.value).toBeDefined()
      }
    }

    const result = generateArgsForField(fieldWithArgs, config, context)
    test.each(allArgNames)(
      'should generate the parameter %s null if it is nullable',
      (arg) => {
        validateParameterIsNullIfNullable(arg, result)
      },
    )
  })

  describe('with sometimes null generation strategy', () => {
    const config: QueryGeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.SOMETIMES_NULL,
    }

    function validateParameterIsOccasionallyNullIfNullable(
      name: string,
      result: ReadonlyArray<Parameter>[],
    ) {
      const parameters = result.map((params) => paramByName(name, params))

      const argument = _.find(fieldWithArgs?.args, (arg) => arg.name === name)

      if (!argument) {
        fail(`expected argument to be defined by name '${name}'`)
      }

      if (isNullableType(argument.type)) {
        expect(
          parameters.filter((it) => it.value === null).length,
        ).toBeGreaterThan(0)
        expect(
          parameters.filter((it) => it.value !== null).length,
        ).toBeGreaterThan(0)
      } else {
        expect(
          parameters.filter((it) => it.value !== null).length,
        ).toBeGreaterThan(0)
      }
    }

    const results = _.range(0, 100).map(() =>
      generateArgsForField(fieldWithArgs, config, context),
    )

    test.each(allArgNames)(
      'should generate all nullable parameters occasionally null',
      (arg) => {
        validateParameterIsOccasionallyNullIfNullable(arg, results)
      },
    )
  })

  describe('for a non-nullable type', () => {
    const nonNullField = getQueryField('testNonNull')

    it('should generate the field', () => {
      const result = generateArgsForField(nonNullField, baseConfig, context)
      expect(paramByType('String!', result).value).toBeDefined()
      expect(paramByType('[String!]!', result).value).toBeDefined()
    })
  })

  describe('for non-standard scalars', () => {
    const nonStandardScalarField = getQueryField('hasCustomScalarArg')

    describe('no custom factory is available', () => {
      it('should raise an error', () => {
        try {
          generateArgsForField(nonStandardScalarField, baseConfig, context)
          fail('expected an error to be thrown')
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect((error as Error).message).toContain(
            `Cannot generate a random value for scalar 'SomeCustomScalar'.`,
          )
          expect((error as Error).message).toContain(
            `'SomeCustomScalar': () => generateRandomCustomScalar()`,
          )
        }
      })
    })

    describe('a custom factory is available', () => {
      it('should use the custom factory', () => {
        const expectedOutput = 'Some-output-for-my-scalar'
        const result = generateArgsForField(
          nonStandardScalarField,
          {
            ...baseConfig,
            factories: {
              SomeCustomScalar: () => expectedOutput,
            },
          },
          context,
        )

        expect(paramByType('SomeCustomScalar', result).value).toEqual(
          expectedOutput,
        )
      })
    })
  })

  describe('when providing a custom factory for a type', () => {
    it('should call the custom factory with the right parameters', () => {
      const output = 'testString'
      const outerContext = context
      const factory = vi.fn((context: GraphQLFactoryContext) => {
        expect(context.defaultFactory).toBeDefined()
        expect(context.defaultFactory?.provide()).toBeDefined()

        if (
          context.targetName === 'defaultValueString' ||
          context.targetName === 'defaultValue'
        ) {
          expect(context.defaultValue).toBe('test default value')
        } else {
          expect(context.defaultValue).toBeUndefined()
        }

        expect(context.targetName).toBeDefined()

        expect(context.depth).toBe(outerContext.depth)

        expect(context.path.startsWith(`${outerContext.path}$`)).toBe(true)
        expect(context.path).toSatisfy(
          (path: string) =>
            path.endsWith(`$${context.targetName}`) ||
            path.endsWith(`.${context.targetName}`),
        )

        expect(context.randomFactory).toBeDefined()
        expect(context.randomFactory?.provide()).toBeDefined()

        return output
      })

      generateArgsForField(
        fieldWithArgs,
        {
          ...baseConfig,
          factories: {
            String: factory,
          },
        },
        context,
      )
    })

    describe('for a raw type', () => {
      const output =
        'This is some dope test string that is clearly not hardcoded somewhere else'

      const config: QueryGeneratorConfig = {
        ...baseConfig,
        factories: {
          String: () => output,
        },
      }

      it('should work for direct type', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('String', result).value).toEqual(output)
      })

      it('should work for field name', () => {
        const targetParam = fieldWithArgs.args.find(
          (item) => item.type === getTypeByName('String'),
        )
        if (!targetParam) {
          fail('expected to find a String argument')
        }

        const result = generateArgsForField(
          fieldWithArgs,
          {
            ...config,
            factories: {
              [targetParam.name]: () => output,
            },
          },
          context,
        )
        expect(paramByType('String', result).value).toEqual(output)
      })

      it('should work for field path', () => {
        const targetParam = fieldWithArgs.args.find(
          (item) => item.type === getTypeByName('String'),
        )
        if (!targetParam) {
          fail('expected to find a String argument')
        }

        const result = generateArgsForField(
          fieldWithArgs,
          {
            ...config,
            factories: {
              hasArgs$string: () => output,
            },
          },
          {
            ...context,
            path: 'hasArgs',
          },
        )
        expect(paramByType('String', result).value).toEqual(output)
      })

      it('should work for lists', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('[String]', result).value).toEqual([output])
      })

      it('should work for nested objects', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        const testInput = paramByType('TestInput', result)

        const value = testInput.value
        expect(value).toBeInstanceOf(Object)

        const record = value as Record<string, unknown>
        expect(record['string']).toEqual(output)
        expect(record['listString']).toEqual([output])
      })

      it('should still use the default factory for other types', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        const defaultFactory = DEFAULT_FACTORIES['Float']
        if (!defaultFactory) {
          fail('Expected a default factory for type `Float`')
        }

        const param = paramByType('Float', result)
        expect(param.value).toEqual(
          defaultFactory({
            ...context,
            targetName: param.name,
          }),
        )
      })
    })

    describe('for a glob type', () => {
      const outputString =
        'This is some dope test string that is clearly not hardcoded somewhere else'
      const outputFloat = 45.4
      const outputEnum = 'RED'

      const config: QueryGeneratorConfig = {
        ...baseConfig,
        factories: {
          'Str*': () => outputString,
          '*loat': () => outputFloat,
          '*est*nu*': () => outputEnum,
        },
      }

      it('should work for direct type', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('String', result).value).toEqual(outputString)
        expect(paramByType('Float', result).value).toEqual(outputFloat)
        expect(paramByType('TestEnum', result).value).toEqual(outputEnum)
      })

      it('should work for lists', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('[String]', result).value).toEqual([outputString])
        expect(paramByType('[Float]', result).value).toEqual([outputFloat])
        expect(paramByType('[TestEnum]', result).value).toEqual([outputEnum])
      })
    })

    describe('for a type property', () => {
      const outputString = 'test string for type property'
      const outputListString = 'test list string in output'
      const config: QueryGeneratorConfig = {
        ...baseConfig,
        factories: {
          'TestInput.string': () => outputString,
          'TestInput.listString': () => outputListString,
        },
      }

      it('should work for direct type', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(
          (paramByType('TestInput', result).value as Record<string, unknown>)[
            'string'
          ],
        ).toEqual(outputString)
      })

      it('should work for lists', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(
          (paramByType('TestInput', result).value as Record<string, unknown>)[
            'listString'
          ],
        ).toEqual([outputListString])
      })
    })
  })

  describe('using a recursive query', () => {
    const schema = getRecursiveTestSchema()
    const recursiveField = getMandatoryField(schema.getQueryType(), 'inputs')

    describe('with never null generation strategy', () => {
      const config: QueryGeneratorConfig = {
        ...baseConfig,
        nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
      }

      it('should generate the field properly without throwing', () => {
        expect(() =>
          generateArgsForField(recursiveField, config, context),
        ).not.toThrow()
      })

      it('should generate a non-empty field', () => {
        const result = generateArgsForField(recursiveField, config, context)
        expect(result).not.toHaveLength(0)
      })
    })
  })
})

describe('generating fake for a GraphQL leaf type value', () => {
  const testField = getTypeByName('ID')

  const baseConfig: FakeGenerationConfig = {
    factories: {},
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  }

  const context: GenerationContext = {
    depth: 3,
    path: 'some.query.path',
  }

  describe('with never null generation strategy', () => {
    const config: FakeGenerationConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }

    it('should generate the fake value', () => {
      expect(
        generateLeafTypeValue(
          'id',
          testField as GraphQLScalarType,
          config,
          context,
        ),
      ).toEqual('08a16b83-9094-4e89-8c05-2ccadd5c1c7e')
    })

    it('should generate the fake value using the name', () => {
      expect(
        generateLeafTypeValue(
          'id',
          getTypeByName('String') as GraphQLScalarType,
          config,
          context,
        ),
      ).toEqual('08a16b83-9094-4e89-8c05-2ccadd5c1c7e')
    })
  })

  describe('with always null generation strategy', () => {
    const config: FakeGenerationConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
    }

    it('should generate a null fake', () => {
      expect(
        generateLeafTypeValue(
          'id',
          testField as GraphQLScalarType,
          config,
          context,
        ),
      ).toBeNull()
    })
  })
})

function paramByName(
  name: string,
  parameters: ReadonlyArray<Parameter>,
): Parameter {
  const result = _.find(parameters, (item) => item.name === name)
  if (!result) {
    fail(`Expected a parameter named '${name}' in ${parameters.toString()}`)
  }
  return result
}

function paramByType(
  type: string,
  parameters: ReadonlyArray<Parameter>,
): Parameter {
  const result = _.find(parameters, (item) => item.type === type)
  if (!result) {
    fail(`Expected a parameter with type '${type}' in ${parameters.toString()}`)
  }
  return result
}

function getTypeByName(type: string): GraphQLNamedType {
  const result = schema.getTypeMap()[type]
  if (!result) {
    fail(`Expected a parameter type '${type}' in schema`)
  }
  return result
}

function getQueryField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getQueryType(), name)
}
