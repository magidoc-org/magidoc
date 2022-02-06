export type GraphQLIntrospectionResult = {
  readonly __schema: {
    readonly queryType?: {
      readonly name: string
    }
    readonly mutationType?: {
      readonly name: string
    }
    readonly subscriptionType?: {
      readonly name: string
    }
    readonly types: ReadonlyArray<FullType>
    readonly directives: ReadonlyArray<Directive>
  }
}

export type FullType = {
  readonly kind: Kind
  readonly name: string
  readonly description?: string
  readonly fields?: ReadonlyArray<Field>
  readonly inputFields?: ReadonlyArray<InputValue>
  readonly interfaces?: ReadonlyArray<TypeRef>
  readonly enumValues?: ReadonlyArray<Enum>
  readonly possibleTypes?: ReadonlyArray<TypeRef>
}

export type Field = {
  readonly name: string
  readonly description?: string
  readonly args: ReadonlyArray<InputValue>
  readonly type: TypeRef
  readonly isDeprecated: boolean
  readonly deprecationReason?: string
}

export type Enum = {
  readonly name: string
  readonly description?: string
  readonly isDeprecated: boolean
  readonly deprecationReason?: string
}

export type InputValue = {
  readonly name: string
  readonly description: string
  readonly type: TypeRef
  readonly defaultValue: unknown
}

export type TypeRef = {
  readonly kind: Kind
  readonly name?: string
  readonly ofType?: TypeRef
}

export enum Kind {
  OBJECT = 'OBJECT',
  NON_NULL = 'NON_NULL',
  LIST = 'LIST',
  SCALAR = 'SCALAR',
  INTERFACE = 'INTERFACE',
  ENUM = 'ENUM',
  INPUT_OBJECT = 'INPUT_OBJECT',
  UNION = 'UNION',
}

export type Directive = {
  readonly name: string
  readonly description?: string
  readonly locations: ReadonlyArray<string>
  readonly args: ReadonlyArray<InputValue>
}
