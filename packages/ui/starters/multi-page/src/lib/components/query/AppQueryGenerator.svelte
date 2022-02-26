<script context="module">
  export const ssr = false
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { generateGraphQLQuery, GraphQLQuery, QueryType } from '@magidoc/core'
  import { NumberInput, Tab, TabContent, Tabs } from 'carbon-components-svelte'
  import CodeMirrorComponent from '@magidoc/plugin-code-mirror'
  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>

  let graphQLQuery: GraphQLQuery | null

  let queryDepth = 3

  let selectedTab: number = 0
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

<br />

<Tabs bind:selected={selectedTab} autoWidth>
  <Tab label="Query" />
  <Tab label="Variables" />
  <svelte:fragment slot="content">
    <TabContent style="padding:0">
      {#if selectedTab === 0}
        <CodeMirrorComponent
          code={graphQLQuery?.query ?? ''}
          mode={'graphql'}
          height={'300px'}
          showLineNumbers={false}
        />
      {/if}
    </TabContent>
    <TabContent style="padding:0">
      {#if selectedTab === 1}
        <CodeMirrorComponent
          code={graphQLQuery?.variables
            ? JSON.stringify(graphQLQuery.variables, null, 2)
            : ''}
          mode={'graphql-variables'}
          height={'300px'}
          showLineNumbers={false}
        />
      {/if}
    </TabContent>
  </svelte:fragment>
</Tabs>

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

  .example-tab {
    padding: 0 !important;
  }
</style>
