<script lang="ts">
import type { QueryType } from '@magidoc/plugin-query-generator'
import { Tabs } from '@skeletonlabs/skeleton-svelte'
import type { GraphQLField } from 'graphql'
import AppQueryGenerator from './AppQueryGenerator.svelte'
import { graphqlQuery } from './stores'

export let type: QueryType
export let field: GraphQLField<unknown, unknown, unknown>

$: graphqlQuery.setField(field, type)
</script>

{#await $graphqlQuery then query}
  {#if query}
    <Tabs defaultValue="query">
      <Tabs.List>
        <Tabs.Trigger value="query">Query</Tabs.Trigger>
        <Tabs.Trigger value="variables">Variables</Tabs.Trigger>
        <Tabs.Trigger value="response">Response</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="query">
        <AppQueryGenerator
          code={query.value?.query ?? '# No query generated. Try increasing the depth'}
          language={'graphql'}
        />
      </Tabs.Content>
      <Tabs.Content value="variables">
        <AppQueryGenerator
          code={query.value?.variables ? JSON.stringify(query.value?.variables || {}, null, 2) : ''}
          language={'json'}
        />
      </Tabs.Content>
      <Tabs.Content value="response">
        <AppQueryGenerator code={query.response ? JSON.stringify(query.response || {}, null, 2) : ''} language={'json'} />
      </Tabs.Content>
    </Tabs>
  {/if}
{/await}
