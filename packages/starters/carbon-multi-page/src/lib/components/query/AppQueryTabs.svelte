<script lang="ts">
import type { QueryType } from '@magidoc/plugin-query-generator'
import { Tab, TabContent, Tabs } from 'carbon-components-svelte'
import type { GraphQLField } from 'graphql'
import { onMount } from 'svelte'
import AppPrism from './AppQueryGenerator.svelte'
import { graphqlQuery } from './stores'

export let type: QueryType
export let field: GraphQLField<unknown, unknown, unknown>

let selectedTab = 0

$: {
  graphqlQuery.setField(field, type)
}
</script>

{#await $graphqlQuery then query}
  {#if query}
    <Tabs bind:selected={selectedTab} autoWidth>
      <Tab label="Query" />
      <Tab label="Variables" />
      <Tab label="Response" />
      <svelte:fragment slot="content">
        <TabContent style="padding:0">
          <AppPrism
            code={query.value?.query ??
              '# No query generated. Try increasing the depth'}
            language={'graphql'}
          />
        </TabContent>
        <TabContent style="padding:0">
          <AppPrism
            code={query.value?.variables
              ? JSON.stringify(query.value?.variables || {}, null, 2)
              : ''}
            language={'json'}
          />
        </TabContent>
        <TabContent id="third" style="padding:0">
          <AppPrism
            code={query.response
              ? JSON.stringify(query.response || {}, null, 2)
              : ''}
            language={'json'}
          />
        </TabContent>
      </svelte:fragment>
    </Tabs>
  {/if}
{/await}
