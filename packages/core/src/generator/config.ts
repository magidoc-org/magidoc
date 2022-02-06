export enum NullGenerationStrategy {
  NEVER_NULL = 'never',
  ALWAYS_NULL = 'always',
  SOMETIMES_NULL = 'sometimes',
}

export type GeneratorConfig = {
  /**
   * The max depth at which we want to generate the query.
   *
   * If the query gets over that depth, all fields that are not leaves are discarded from the query.
   */
  readonly maxDepth: number

  /**
   * For input values that allow for null values, the strategy here will define the default behaviour for generating the null values.
   *
   * Choices are
   *  - NEVER_NULL, which will never pass nullable values as null
   *  - ALWAYS_NULL, which will always pass nullable values as null
   *  - SOMETIMES_NULL, which will randomly pass null or not
   */
  readonly nullGenerationStrategy: NullGenerationStrategy

  /**
   * Custom factories. Custom factories are used when generating random input values to pass as arguments to your API.
   *
   * The supported syntax in order of priority for the factory key is the following:
   *  - '[Type]' : In highest priority is the list matcher. If you need to provide a custom list for a specific type.
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

export type GraphQLFactoryContext = {
  /**
   * Either the argument name or the nested field name
   */
  readonly targetName: string

  /**
   * The default value provided by the GraphQL schema.
   *
   * By default, ATG will not use the default value provided in the schema, but you can DYI by providing factory that returns the default value.
   */
  readonly defaultValue?: unknown

  /**
   * The context for the default value provider that would be used otherwise.
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
