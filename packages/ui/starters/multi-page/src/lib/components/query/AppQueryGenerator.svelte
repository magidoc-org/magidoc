<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import { generateGraphQLQuery, GraphQLQuery, QueryType } from '@magidoc/core'
  import { NumberInput } from 'carbon-components-svelte'

  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>

  let CodeMirror: unknown
  let graphQLQuery: GraphQLQuery | null

  let queryDepth = 3

  onMount(async () => {
    if (!window) return
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.CodeMirror = (await import('codemirror')).default
    CodeMirror = (await import('@magidoc/plugin-code-mirror')).default
  })

  $: graphQLQuery = generateGraphQLQuery(field, {
    queryType: type,
    maxDepth: queryDepth,
  })
</script>

{#if CodeMirror}
  <div class="control-bar-wrapper">
    <div class="query-depth-wrapper">
      <NumberInput
        size="sm"
        label={'Max Query Depth'}
        min={2}
        max={8}
        bind:value={queryDepth}
      />
    </div>
  </div>

  <svelte:component
    this={CodeMirror}
    code={graphQLQuery?.query ?? ''}
    mode={'graphql'}
    showLineNumbers={false}
  />
{/if}

<style>
  .control-bar-wrapper {
    display: flex;
    justify-content: right;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }

  .query-depth-wrapper {
    display: flex;
    width: 12rem;
  }
</style>
