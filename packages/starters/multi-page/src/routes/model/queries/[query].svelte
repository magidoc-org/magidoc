<script lang="ts">
  import { QueryType } from '@magidoc/plugin-query-generator'
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'

  let field: GraphQLField<unknown, unknown, unknown> | undefined
  $: field = $schema.getQueryType()?.getFields()[$page.params.query]

</script>

{#if field}
  <FieldDetails {field} type={QueryType.QUERY} />
{:else}
  <EntityNotFound type="query" name={$page.params.query} />
{/if}
