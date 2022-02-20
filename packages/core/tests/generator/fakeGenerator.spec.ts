import { isNullableType } from 'graphql'
import _ from 'lodash'
import {
  generateArgsForField,
  GenerationContext,
  GeneratorConfig,
  NullGenerationStrategy,
  Parameter,
} from '../../src'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'

const schema = getTestSchema()

describe('generating fakes for a GraphQL input argument', () => {
  const fieldWithArgs = schema.getQueryType()?.getFields()['hasArgs']

  if (!fieldWithArgs) {
    fail('fieldWithArgs should not be null... did you modify the test schema?')
  }

  const baseConfig: GeneratorConfig = {
    factories: {},
    maxDepth: 5,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  }
  const context: GenerationContext = {
    depth: 3,
    path: 'some-path',
  }

  const allArgNames = fieldWithArgs.args.map((arg) => arg.name)

  beforeAll(() => {
    // Ensure we have elements in there
    expect(allArgNames).toHaveLength(15)
  })

  describe('with never null generation strategy', () => {
    const config: GeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }

    function validateParameterEqualToDefaultFactory(
      name: string,
      result: ReadonlyArray<Parameter>,
    ) {
      const parameter = paramByName(name, result)
      const defaultFactory = _.find(DEFAULT_FACTORIES, (__, key) =>
        name.includes(key),
      )
      const defaultValue = defaultFactory
        ? defaultFactory({
            depth: 1,
            path: 'whatever',
            targetName: name,
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
    const config: GeneratorConfig = {
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

  describe('with sometimes null', () => {
    const config: GeneratorConfig = {
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
        expect(parameters).toSatisfyAny(
          (item: Parameter) => item.value === null,
        )
        expect(parameters).toSatisfyAny(
          (item: Parameter) => item.value !== null,
        )
      } else {
        expect(parameters).toSatisfyAll(
          (item: Parameter) => item.value !== null,
        )
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
