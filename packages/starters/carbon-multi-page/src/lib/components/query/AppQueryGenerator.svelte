<script lang="ts">
  import { graphqlQuery } from './stores'
  import { Tab, TabContent, Tabs } from 'carbon-components-svelte'
  import type { GraphQLField } from 'graphql'
  import AppPrism from './AppPrism.svelte'
  import type { QueryType } from '@magidoc/plugin-query-generator'

  export let type: QueryType
  export let field: GraphQLField<unknown, unknown, unknown>

  let selectedTab = 0

  $: {
    graphqlQuery.setField(field, type)
  }
</script>

<Tabs bind:selected={selectedTab} autoWidth>
  <Tab label="Query" />
  <Tab label="Variables" />
  <Tab label="Response" />
  <svelte:fragment slot="content">
    <TabContent style="padding:0">
      {#if selectedTab === 0}
        <AppPrism
          code={$graphqlQuery.value?.query ??
            '# No query generated. Try increasing the depth'}
          language={'graphql'}
        />
      {/if}
    </TabContent>
    <TabContent style="padding:0">
      {#if selectedTab === 1}
        <AppPrism
          code={$graphqlQuery.value?.variables
            ? JSON.stringify($graphqlQuery.value?.variables || {}, null, 2)
            : ''}
          language={'json'}
        />
      {/if}
    </TabContent>
    <TabContent style="padding:0">
      {#if selectedTab === 2}
        <AppPrism
          code={$graphqlQuery.response
            ? JSON.stringify($graphqlQuery.response || {}, null, 2)
            : ''}
          language={'json'}
        />
      {/if}
    </TabContent>
  </svelte:fragment>
</Tabs>
