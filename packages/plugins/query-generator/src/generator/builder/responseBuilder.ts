import _ from 'lodash'
import type { GraphQLField } from 'graphql'

export class RootResponseBuilder {
  private readonly target: GraphQLField<unknown, unknown, unknown>
  private readonly value: ResponseFieldValueBuilder

  constructor(
    target: GraphQLField<unknown, unknown, unknown>,
    value: ResponseFieldValueBuilder,
  ) {
    this.target = target
    this.value = value
  }

  build(): Record<string, unknown> {
    return {
      [this.target.name]: this.value.build(),
    }
  }
}

export interface ResponseFieldValueBuilder {
  build(): unknown
}

export class SubObjectResponseBuilder implements ResponseFieldValueBuilder {
  private readonly fields: Record<string, ResponseFieldValueBuilder>

  constructor(fields: Record<string, ResponseFieldValueBuilder>) {
    this.fields = fields
  }

  withField(
    name: string,
    value: ResponseFieldValueBuilder,
  ): SubObjectResponseBuilder {
    return new SubObjectResponseBuilder({
      ...this.fields,
      [name]: value,
    })
  }

  build(): unknown {
    return {
      ..._.entries(this.fields).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value.build(),
        }),
        {},
      ),
    }
  }
}

export class ArrayResponseBuilder implements ResponseFieldValueBuilder {
  private readonly values: ReadonlyArray<ResponseFieldValueBuilder>

  constructor(values: ReadonlyArray<ResponseFieldValueBuilder>) {
    this.values = values
  }

  withValue(value: ResponseFieldValueBuilder): ArrayResponseBuilder {
    return new ArrayResponseBuilder([...this.values, value])
  }

  build(): unknown {
    return this.values.map((value) => value.build())
  }
}

export class ValueResponseBuilder implements ResponseFieldValueBuilder {
  private readonly value: unknown

  constructor(value: unknown) {
    this.value = value
  }

  build(): unknown {
    return this.value
  }
}

export function fieldResponseBuilder(
  field: GraphQLField<unknown, unknown, unknown>,
  result: ResponseFieldValueBuilder,
): RootResponseBuilder {
  return new RootResponseBuilder(field, result)
}

export function valueResponseBuilder(value: unknown): ValueResponseBuilder {
  return new ValueResponseBuilder(value)
}

export function subObjectResponseBuilder(): SubObjectResponseBuilder {
  return new SubObjectResponseBuilder({})
}

export function arrayResponseBuilder(): ArrayResponseBuilder {
  return new ArrayResponseBuilder([])
}
