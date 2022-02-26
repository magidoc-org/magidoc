<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { generateGraphQLQuery, GraphQLQuery, QueryType } from '@magidoc/core'
  import { ExpandableTile, NumberInput } from 'carbon-components-svelte'
  import CodeMirrorComponent from '@magidoc/plugin-code-mirror'
  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>

  let graphQLQuery: GraphQLQuery | null

  let queryDepth = 3

  onMount(async () => {
    if (browser) {
      const CodeMirror = (await import('codemirror')).default
      window.CodeMirror = CodeMirror
    }
  })
  
  $: graphQLQuery = generateGraphQLQuery(field, {
    queryType: type,
    maxDepth: queryDepth,
  })
</script>

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

<CodeMirrorComponent
  code={graphQLQuery?.query ?? ''}
  mode={'graphql'}
  showLineNumbers={false}
/>

<br />

<ExpandableTile>
  <div slot="above"><p>Variables</p></div>
  <div slot="below">
    <CodeMirrorComponent
      code={graphQLQuery?.variables
        ? JSON.stringify(graphQLQuery.variables, null, 2)
        : ''}
      mode={'graphql-variables'}
      showLineNumbers={false}
    />
  </div>
</ExpandableTile>

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
