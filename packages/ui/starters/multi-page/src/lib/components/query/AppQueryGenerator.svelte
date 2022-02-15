<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import {
    Column,
    Grid,
    NumberInput,
    Row,
    Tile,
  } from 'carbon-components-svelte'

  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let field: GraphQLField<unknown, unknown, unknown>

  let QueryGenerator: unknown

  let queryDepth = 3

  onMount(async () => {
    if (!window) return
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.CodeMirror = (await import('codemirror')).default
    QueryGenerator = (await import('@magidoc/plugin-query-generator')).default
  })
</script>

{#if QueryGenerator}
    <NumberInput
      label={'Query Depth'}
      min={3}
      max={8}
      bind:value={queryDepth}
    />
  <svelte:component
    this={QueryGenerator}
    {field}
    generatorConfig={{
      maxDepth: queryDepth,
    }}
    queryPanelHeight={300}
    variablesPanelHeight={180}
    showQueryPanelLineNumbers={false}
  />
{/if}
