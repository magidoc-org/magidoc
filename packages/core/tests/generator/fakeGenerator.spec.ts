import {
  generateArgsForField,
  GenerationContext,
  GeneratorConfig,
  NullGenerationStrategy,
} from '../../src'

const schema = getTestSchema()

describe('generating fakes for a GraphQL input argument', () => {
  const fieldWithArgs = schema.getQueryType()?.getFields()['hasArgs']
  if (!fieldWithArgs)
    fail('fieldWithArgs should not be null... did you modify the test schema?')
  const baseConfig: GeneratorConfig = {
    factories: {},
    maxDepth: 5,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  }
  const context: GenerationContext = {
    depth: 3,
    path: 'some-path',
  }

  describe('with never null generation strategy', () => {
    const config: GeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }

    it('generates the input properly with no null values', () => {
      const result = generateArgsForField(fieldWithArgs, config, context)
      console.log(result)
      console.log(result)
    })
  })
})
