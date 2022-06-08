import { generateGraphQLQuery } from './generator/queryGenerator'

export {
  NullGenerationStrategy,
  type GeneratorConfig,
  type GraphQLFactory,
  type GraphQLFactoryContext,
  type GraphQLFactoryContextDefault,
} from './generator/config'

export {
  GraphQLGenerationError,
  MissingCustomScalarException,
} from './generator/error'

export { QueryType } from './generator/queryBuilder'
export {
  generateGraphQLQuery,
  type GenerationContext,
} from './generator/queryGenerator'

export type { GraphQLQuery, GraphQLVariables } from './models/query'

export { gql } from './formatter/query'

export default generateGraphQLQuery
