<script lang="ts">
  import { schema } from '$lib/model'
  import { Tag, TooltipDefinition } from 'carbon-components-svelte'

  import {
    Kind,
    type ConstArgumentNode,
    type ConstDirectiveNode,
    type ConstValueNode,
    type GraphQLArgument,
  } from 'graphql'

  export let directive: ConstDirectiveNode

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
        return `{${value.fields
          .map(
            (field) =>
              `${field.name.value}: ${printDirectiveValue(field.value)}`,
          )
          .join(', ')}}`
    }
  }

  function isValidDirective(value: ConstDirectiveNode): boolean {
    return value.name.value !== 'deprecated'
  }

  function getArgumentValue(
    argument: GraphQLArgument,
    providedArgs: ReadonlyArray<ConstArgumentNode>,
  ): string {
    const argumentValue = providedArgs.find(
      (arg) => arg.name.value === argument.name,
    )

    if (argumentValue) {
      return printDirectiveValue(argumentValue.value)
    }

    return JSON.stringify(argument.defaultValue)
  }

  $: {
    const directiveDefinition = schema.getDirective(directive.name.value)
    let definition = `@${directive.name.value}`
    if ((directiveDefinition?.args?.length || 0) > 0) {
      definition += `(${(directiveDefinition?.args || [])
        .map(
          (arg) =>
            `${arg.name}: ${getArgumentValue(arg, directive.arguments || [])}`,
        )
        .join(', ')})`
    }
    text = definition.trim()
  }
</script>

{#if isValidDirective(directive)}
  <Tag type="cool-gray">
    <div>
      <TooltipDefinition tooltipText={text} direction="top" align="center">
        {directive.name.value}
      </TooltipDefinition>
    </div>
  </Tag>
{/if}
