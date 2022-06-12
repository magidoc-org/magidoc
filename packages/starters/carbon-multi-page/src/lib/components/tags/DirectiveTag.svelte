<script lang="ts">
  import { Tag, TooltipDefinition } from 'carbon-components-svelte'

  import type { ConstDirectiveNode } from 'graphql'

  export let directive: ConstDirectiveNode

  let directiveDefinition: string
  let text: string
  $: {
    let definition = `@${directive.name.value}`
    if ((directive.arguments?.length || 0) > 0) {
      definition += `(${(directive.arguments || [])
        .map((arg) => `${arg.name.value}: ${String(arg.value)}`)
        .join(', ')})`
    }
    directiveDefinition = definition
  }
  $: text = `${directiveDefinition}q`
  //   $: text = `${directive.description ? directive.description + '\n' : ''}${directiveDefinition}`
</script>

<Tag type="cool-gray">
  <TooltipDefinition tooltipText={text}>@{directive.name}</TooltipDefinition>
</Tag>
