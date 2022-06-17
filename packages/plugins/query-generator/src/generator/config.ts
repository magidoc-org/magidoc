import type { QueryType } from '..'

export enum NullGenerationStrategy {
  /**
   * All nullable fields will never be null
   */
  NEVER_NULL = 'never',
  /**
   * All nullable fields will always be null
   */
  ALWAYS_NULL = 'always',
  /**
   * Nullable fields will sometimes be need. This may be useful in some cases,
   * The nullability of a field is determined by a random generator, so the output query will never be the same.
   */
  SOMETIMES_NULL = 'sometimes',
}

export type FakeGenerationConfig = {
  /**
   * For input values that allow for null values, the strategy here will define the default behavior for generating the null values.
   *
   * @default NullGenerationStrategy.NEVER_NULL
   */
  readonly nullGenerationStrategy: NullGenerationStrategy

  /**
   * Custom factories. Custom factories are used when generating random input values to pass as arguments to your API.
   *
   * The supported syntax in order of priority for the factory key is the following:
   *  - 'path'   : A specific path for an argument, in the format `a.field.path$argument.path`. You can customize a specific argument inside a request using this.
   *               For instance, you may have a factory at path `people$first` set to `10`,
   *               so that an argument passed to the argument `first` of the field `people` gets set to 10.
   *
   *  - 'argName': In second highest priority is a matcher on the argument name directly. For instance,
   *               if you have an argument named `email` in your API, then you can use `email` as a factory key.
   *
   *  - '[Type]' : Then comes the list matcher. If you need to provide a custom list for a specific type.
   *               If you don't need anything specific in the list, you can u#se the second matcher.
   *
   *  - 'Type' : Your type directly. If there is a direct match for this key, it will be used first.
   *             This factory will also be used when generating a list if no list factory is provided.
   *
   * - '*Type':  You type with wildcard. It is more useful if you have many types that you would want empty by default.
   *             For instance, some applications may have different filters that you would want empty by default, which would give:
   *             '*Filter' : () => null. The supported syntax is the one of `Micromatch` https://www.npmjs.com/package/micromatch
   */
  readonly factories: Record<string, GraphQLFactory>
}

export type ResponseGenerationConfig = FakeGenerationConfig & {
  /**
   * The max depth at which we want to generate the query.
   *
   * If the query gets over that depth, all fields that are not leaves are discarded from the query.
   *
   * @default 5
   */
  readonly maxDepth: number
}

export type QueryGeneratorConfig = ResponseGenerationConfig & {
  /**
   * The type of the GraphQL Requests.
   *
   * @default QueryType.QUERY
   */
  readonly queryType: QueryType

  /**
   * The name of the query. By default, this will be undefined, which means the query is anonymous.
   *
   * @default undefined
   */
  readonly queryName?: string
}

export type GraphQLFactoryContext = {
  /**
   * Either the argument name or the nested field name
   */
  readonly targetName: string

  /**
   * The default value provided by the GraphQL schema.
   *
   * By default, the default value provided in the schema is never used, but you can decide to use it by providing a factory that will return it if it exists.
   */
  readonly defaultValue?: unknown

  /**
   * The default factory that exists for this type.
   * Can be useful if you want to perform custom actions and fallback to the default provider.
   * Note that this factory is always the factory for a scalar value. Thus, if you create a factory for a [String!]!, then the default factory will return a String, not an array of strings. You will be required to return an array yourself.
   *
   * This property is only available when overriding the default generators.
   */
  readonly defaultFactory?: GraphQLFactoryContextDefault

  /**
   * The random factory that would be used to generate this object. This can be useful to fallback on a random object.
   */
  readonly randomFactory?: GraphQLFactoryContextDefault

  /**
   * The current depth in the field generation. This does not include the depth of the current parameter.
   */
  readonly depth: number

  /**
   * Path in the query to the current parameter. It is composed of two parts.
   * <query_path>$<parameter_path>
   */
  readonly path: string
}

export type GraphQLFactoryContextDefault = {
  readonly provide: () => unknown
}

/**
 * A factory providing a random or arbitrary value for a given target argument or argument field.
 */
export type GraphQLFactory = (context: GraphQLFactoryContext) => unknown
