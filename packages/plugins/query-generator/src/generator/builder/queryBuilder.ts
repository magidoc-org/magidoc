import { prettify } from '../../formatter/query'
import type { GraphQLQuery } from '../../models/query'
import _ from 'lodash'

export enum QueryType {
  /**
   * Generates a query
   */
  QUERY = 'query',
  /**
   * Generates a mutation
   */
  MUTATION = 'mutation',
  /**
   * Generates a subscription
   */
  SUBSCRIPTION = 'subscription',
}

export type Parameter = {
  readonly name: string
  readonly type: string
  readonly value: unknown
}

type VariableParameter = Parameter & {
  variableName: string
}

type BuilderField = {
  readonly parameters: ReadonlyArray<Parameter>
  readonly subSelection?: QueryBuilder
}

type BuilderFields = Record<string, BuilderField>

type QuerySubSelection = {
  readonly query: string
  readonly variables: ReadonlyArray<VariableParameter>
}

export class QueryBuilder {
  private readonly name: string = ''
  private readonly type: QueryType
  private readonly fields: BuilderFields = {}

  constructor(type: QueryType, name: string, fields: BuilderFields) {
    this.name = name
    this.type = type
    this.fields = fields
  }

  withInlineFragment(
    fragment: string,
    subSelection: QueryBuilder,
  ): QueryBuilder {
    /**
     * An inline fragment is nothing more than a field with a complex name
     *
     * ... on Type {}
     *
     * has the same syntax as
     *
     * field {}
     *
     * a fragment name is also unique within a query, and so are fields
     */
    return this.withField(`... on ${fragment}`, [], subSelection)
  }

  withType(type: QueryType): QueryBuilder {
    return new QueryBuilder(type, this.name, this.fields)
  }

  withName(name?: string): QueryBuilder {
    return new QueryBuilder(this.type, name ?? '', this.fields)
  }

  withField(
    name: string,
    parameters: ReadonlyArray<Parameter>,
    subSelection?: QueryBuilder,
  ): QueryBuilder {
    name = name.trim()

    return new QueryBuilder(this.type, this.name, {
      ...this.fields,
      [name]: {
        parameters: parameters,
        subSelection,
      },
    })
  }

  async build(): Promise<GraphQLQuery> {
    const subSelection = this.buildSelection(new Set())
    const variablePlaceholder = this.generateArgumentPlaceholder(
      subSelection.variables,
    )

    return {
      query: await prettify(
        `${this.type} ${this.name}${variablePlaceholder}${subSelection.query}`,
      ),
      variables: _.mapValues(
        _.keyBy(
          subSelection.variables,
          (variable: VariableParameter) => variable.variableName,
        ),
        (variable: Parameter) => variable.value,
      ),
    }
  }

  private buildSelection(usedParameterNames: Set<string>): QuerySubSelection {
    if (!this.hasFields()) {
      throw new Error(
        'Cannot generate a sub-selection with no fields in it. A minimum of one field must be queried if the sub-selection is defined.',
      )
    }

    type BuiltSubSelection = {
      readonly parameters: ReadonlyArray<VariableParameter>
      readonly inlineFragment?: string
      readonly subSelection?: QuerySubSelection
    }

    const mappedFields: Record<string, BuiltSubSelection> = _.mapValues(
      this.fields,
      (field: BuilderField) => ({
        parameters: field.parameters.map((parameter) => {
          return this.asUniquelyNamedParameter(parameter, usedParameterNames)
        }),
        subSelection: field.subSelection?.buildSelection(usedParameterNames),
      }),
    )

    const fieldsAsQueries: ReadonlyArray<string> = Object.keys(
      mappedFields,
    ).map((name: string) => {
      const value = mappedFields[name]

      const parametersString = value.parameters
        .map(
          (parameter: VariableParameter) =>
            `${parameter.name}: $${parameter.variableName}`,
        )
        .join(', ')

      const parameterPlaceholder =
        parametersString.length === 0 ? '' : `(${parametersString})`

      // format: field(arg: $arg, <parameterPlaceholder>) { <subSelection> }
      return `${name}${parameterPlaceholder}${value.subSelection?.query ?? ''}`
    })

    const allQueryVariablesRequiredNested: ReadonlyArray<VariableParameter> =
      _.flatMap(
        Object.keys(mappedFields).map((name: string) => {
          const mappedField = mappedFields[name]
          return [
            ...mappedField.parameters, // Current field parameters
            ...(mappedField.subSelection?.variables || []), // Parameters of sub selection
          ]
        }),
      )
    return {
      query: `
        {
          ${fieldsAsQueries.join(' ')}
        }
      `,
      variables: allQueryVariablesRequiredNested,
    }
  }

  private generateArgumentPlaceholder(
    variables: ReadonlyArray<VariableParameter>,
  ): string {
    const variablesString = variables
      .map((variable) => `$${variable.variableName}:${variable.type}`)
      .join(', ')

    return variablesString.length === 0 ? '' : `(${variablesString})`
  }

  private asUniquelyNamedParameter(
    parameter: Parameter,
    allUsedVariableNames: Set<string>,
    count = 1,
  ): VariableParameter {
    const current =
      count === 1 ? parameter.name : parameter.name + count.toString()

    if (!allUsedVariableNames.has(current)) {
      allUsedVariableNames.add(current)
      return {
        variableName: current,
        ...parameter,
      }
    }

    return this.asUniquelyNamedParameter(
      parameter,
      allUsedVariableNames,
      count + 1,
    )
  }

  private hasFields(): boolean {
    return _.size(this.fields) !== 0
  }
}

export function queryBuilder(): QueryBuilder {
  return new QueryBuilder(QueryType.QUERY, '', {})
}

export function mutationBuilder(): QueryBuilder {
  return new QueryBuilder(QueryType.MUTATION, '', {})
}

export function subSelectionBuilder(): QueryBuilder {
  return queryBuilder()
}
