<script lang="ts">
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import {
  type ConstArgumentNode,
  type ConstDirectiveNode,
  type ConstValueNode,
  type GraphQLArgument,
  type GraphQLDirective,
  Kind,
} from 'graphql'
import { getAllowedArgumentsByDirective, isAllowedDirective, schema } from '$lib/model'
import { getSiteRoot } from '$lib/variables'
import AppTag from '../common/AppTag.svelte'
import AppTooltip from '../common/AppTooltip.svelte'

export let directive: ConstDirectiveNode

let directiveDefinition: GraphQLDirective | undefined | null

$: directiveDefinition = schema.getDirective(directive.name.value)

let text: string

function printDirectiveValue(value: ConstValueNode): string {
  switch (value.kind) {
    case Kind.INT:
    case Kind.BOOLEAN:
    case Kind.FLOAT:
      return String(value.value)
    case Kind.STRING:
    case Kind.ENUM:
      return `"${value.value}"`
    case Kind.NULL:
      return 'null'
    case Kind.LIST:
      return `[${value.values.map(printDirectiveValue).join(', ')}]`
    case Kind.OBJECT:
      return `{${value.fields.map((field) => `${field.name.value}: ${printDirectiveValue(field.value)}`).join(', ')}}`
  }
}

function shouldShowDirective(): boolean {
  return !!directiveDefinition && isAllowedDirective(directiveDefinition)
}

function getArgumentValue(argument: GraphQLArgument, providedArgs: ReadonlyArray<ConstArgumentNode>): string {
  const argumentValue = providedArgs.find((arg) => arg.name.value === argument.name)

  if (argumentValue) {
    return printDirectiveValue(argumentValue.value)
  }

  return JSON.stringify(argument.defaultValue)
}

$: {
  let definition = `@${directive.name.value}`

  const allowedArguments = directiveDefinition ? getAllowedArgumentsByDirective(directiveDefinition) : []

  if (allowedArguments.length > 0) {
    definition += `(${allowedArguments
      .map((arg) => `${arg.name}: ${getArgumentValue(arg, directive.arguments || [])}`)
      .join(', ')})`
  }
  text = definition.trim()
}
</script>

{#if shouldShowDirective()}
  <AppTag color="blue">
    <a href={urlUtils.joinUrlPaths(getSiteRoot(), `/directives/${directive.name.value}`)} class="hover:underline">
      <AppTooltip {text}>@{directive.name.value}</AppTooltip>
    </a>
  </AppTag>
{/if}
