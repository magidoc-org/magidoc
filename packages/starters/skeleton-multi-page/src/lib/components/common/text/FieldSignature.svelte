<script lang="ts">
import type { GraphQLType } from 'graphql'
import DefaultValueDisplay from './DefaultValueDisplay.svelte'
import TypeLink from './TypeLink.svelte'

export let name: string
export let type: GraphQLType
export let deprecated = false
export let defaultValue: unknown = undefined
</script>

<span class="font-mono text-sm">
  <span class="font-semibold" class:deprecated>{name}</span><span class="text-surface-500">:</span>
  <TypeLink {type} />
  {#if defaultValue !== undefined}
    <span class="text-surface-500">=</span>
    <span class="text-success-700-300"><DefaultValueDisplay value={defaultValue} /></span>
  {/if}
</span>
