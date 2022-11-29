import {
  print,
  isSpecifiedScalarType,
  isSpecifiedDirective,
  GraphQLSchema,
  printSchema,
} from 'graphql'

export function printSchemaWithDirectives(schema: GraphQLSchema) {
  if (!schema.astNode) return printSchema(schema)

  const str = Object.keys(schema.getTypeMap())
    .filter((k) => !k.match(/^__/))
    .reduce((accum, name) => {
      const type = schema.getType(name)
      if (!type || !type.astNode) return accum
      return !isSpecifiedScalarType(type)
        ? (accum += `${print(type.astNode)}\n`)
        : accum
    }, '')

  return schema.getDirectives().reduce((accum, d) => {
    if (!d.astNode) return accum
    return !isSpecifiedDirective(d) ? (accum += `${print(d.astNode)}\n`) : accum
  }, str + `${print(schema.astNode)}\n`)
}
