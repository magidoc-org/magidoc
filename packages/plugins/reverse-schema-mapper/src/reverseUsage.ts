import {
  GraphQLArgument,
  GraphQLField,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLUnionType,
} from 'graphql'

export type TypeReverseMapping = {
  /**
   * A list of references to this type.
   */
  readonly references: Reference[]
}

export type Reference = UnionReference | ArgumentReference | FieldReference

export enum ReferenceKind {
  /**
   * When type is referenced in a union object.
   */
  UNION = 'union',
  /**
   * When type is referenced as an argument for a field.
   */
  ARGUMENT = 'argument',
  /**
   * When type is referenced as a field.
   */
  FIELD = 'field',
}

export type UnionReference = {
  /**
   * The kind of reference.
   */
  kind: ReferenceKind.UNION
  /**
   * The union type that references this type.
   */
  by: GraphQLUnionType
}

export type ArgumentReference = {
  /**
   * The kind of reference.
   */
  kind: ReferenceKind.ARGUMENT
  /**
   * The field that uses this argument.
   */
  field: GraphQLField<unknown, unknown, unknown>
  /**
   * The type that has the field that uses this argument.
   */
  type: GraphQLNamedType
  /**
   * The argument that references this type.
   */
  by: GraphQLArgument
}

export type FieldReference = {
  /**
   * The kind of reference.
   */
  kind: ReferenceKind.FIELD
  /**
   * The parent object that uses this field.
   */
  parent: GraphQLObjectType<unknown, unknown>
  /**
   * The field that uses the type.
   */
  by: GraphQLField<unknown, unknown, unknown>
}
