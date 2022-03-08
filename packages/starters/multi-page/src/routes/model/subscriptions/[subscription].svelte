<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import { QueryType } from '@magidoc/plugin-query-generator'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'

  let field: GraphQLField<unknown, unknown, unknown> | undefined
  $: field = $schema.getSubscriptionType()?.getFields()[
    $page.params.subscription
  ]
</script>

{#if field}
  <FieldDetails {field} type={QueryType.SUBSCRIPTION} />
{:else}
  <EntityNotFound type="subscription" name={$page.params.subscription} />
{/if}
