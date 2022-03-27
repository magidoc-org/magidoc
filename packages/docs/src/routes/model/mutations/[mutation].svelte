<script lang="ts">
  import { QueryType } from '@magidoc/plugin-query-generator'
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'

  let field: GraphQLField<unknown, unknown, unknown> | undefined
  $: field = $schema.getMutationType()?.getFields()[$page.params.mutation]
</script>

{#if field}
  <FieldDetails {field} type={QueryType.MUTATION} />
{:else}
  <EntityNotFound type="mutation" name={$page.params.mutation} />
{/if}
