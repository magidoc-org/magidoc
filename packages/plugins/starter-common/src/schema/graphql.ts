import { AllowedDirective, templates } from '@magidoc/plugin-starter-variables'
import type { GraphQLSchema, GraphQLDirective } from 'graphql'
import { getOrDefault } from '../pages/variables'

// Built-in directives that don't need documentation.
const IGNORED_DIRECTIVES = ['include', 'skip', 'deprecated', 'specifiedBy']

export function isEmpty(schema: GraphQLSchema): boolean {
  return Object.keys(schema.getTypeMap()).length <= 10
}

export function computeAllowedDirectives(
  schema: GraphQLSchema,
): ReadonlyArray<GraphQLDirective> {
  const allowedDirectives = getOrDefault(templates.DIRECTIVES, [])

  if (allowedDirectives.some((directive) => directive?.name === '*')) {
    return schema
      .getDirectives()
      .filter((directive) => !IGNORED_DIRECTIVES.includes(directive.name))
  }

  return allowedDirectives
    .filter((directive): directive is AllowedDirective => !!directive?.name)
    .map(({ name }) => (name ? schema.getDirective(name) : undefined))
    .filter((directive): directive is GraphQLDirective => !!directive)
}
