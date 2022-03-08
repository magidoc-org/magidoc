<script lang="ts">
  import { browser } from '$app/env'
  import { graphqlQuery } from './stores'
  import { Tab, TabContent, Tabs } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import { onMount } from 'svelte'
  import AppCodeMirror from './GeneratedQueryPart.svelte'
  import type { QueryType } from '@magidoc/plugin-query-generator'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>

  let selectedTab = 0

  onMount(async () => {
    if (browser) {
      const CodeMirror = (await import('codemirror')).default
      window.CodeMirror = CodeMirror
    }
  })

  $: {
    graphqlQuery.setField(field, type)
  }
</script>

{#if browser}
  <Tabs bind:selected={selectedTab} autoWidth>
    <Tab label="Query" />
    <Tab label="Variables" />
    <svelte:fragment slot="content">
      <TabContent style="padding:0">
        {#if selectedTab === 0}
          <AppCodeMirror
            code={$graphqlQuery?.query ?? ''}
            mode={'graphql'}
            height={300}
          />
        {/if}
      </TabContent>
      <TabContent style="padding:0">
        {#if selectedTab === 1}
          <AppCodeMirror
            code={$graphqlQuery?.variables
              ? JSON.stringify($graphqlQuery?.variables || {}, null, 2)
              : ''}
            mode={'graphql-variables'}
            height={300}
          />
        {/if}
      </TabContent>
    </svelte:fragment>
  </Tabs>
{/if}
