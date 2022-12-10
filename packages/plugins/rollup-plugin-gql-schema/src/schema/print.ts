import {
  print,
  isSpecifiedScalarType,
  isSpecifiedDirective,
  GraphQLSchema,
} from 'graphql'

export function printSchemaWithDirectives(schema: GraphQLSchema) {
  const str = Object.values(schema.getTypeMap())
    .filter((k) => !k.name.match(/^__/))
    .reduce((accum, type) => {
      if (isSpecifiedScalarType(type)) return accum
      const typeString = type.astNode ? print(type.astNode) : ''
      const extensionString = type.extensionASTNodes
        ? type.extensionASTNodes.map((ast) => print(ast)).join('\n')
        : ''
      return `${accum}\n${typeString}\n${extensionString}\n`
    }, '')

  return schema.getDirectives().reduce((accum, d) => {
    if (!d.astNode) return accum
    return !isSpecifiedDirective(d) ? (accum += `${print(d.astNode)}\n`) : accum
  }, str + `${schema.astNode ? print(schema.astNode) : ''}\n`)
}
