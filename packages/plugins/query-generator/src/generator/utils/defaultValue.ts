import { coerceInputLiteral, coerceInputValue, type GraphQLArgument, type GraphQLInputField } from 'graphql'

export function getDefaultValue(input: GraphQLArgument | GraphQLInputField): unknown {
  if (input.default === undefined) {
    return input.defaultValue
  }

  return input.default.literal
    ? coerceInputLiteral(input.default.literal, input.type)
    : coerceInputValue(input.default.value, input.type)
}
